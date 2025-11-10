// ========================================
// MAIN REGISTRATION HANDLER (doPost)
// ========================================
function doPost(e) {
    try {
        // Get the active spreadsheet and sheet
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Parse the incoming data
        const data = JSON.parse(e.postData.contents);

        // Add headers if this is the first entry
        if (sheet.getLastRow() === 0) {
            const headers = [
                'Timestamp',
                'Status',
                'Name',
                'Email',
                'Phone',
                'College/University',
                'City',
                'GitHub Profile',
                'LinkedIn Profile',
                'WhatsApp Screenshot',
                'LinkedIn Screenshot',
                'Instagram Screenshot'
            ];

            sheet.appendRow(headers);

            // Format headers
            const headerRange = sheet.getRange(1, 1, 1, headers.length);
            headerRange.setFontWeight('bold');
            headerRange.setBackground('#4285f4');
            headerRange.setFontColor('#ffffff');
            headerRange.setHorizontalAlignment('center');

            // Set column widths
            sheet.setColumnWidth(1, 180);  // Timestamp
            sheet.setColumnWidth(2, 120);  // Status
            sheet.setColumnWidth(3, 200);  // Name
            sheet.setColumnWidth(4, 250);  // Email
            sheet.setColumnWidth(5, 120);  // Phone
            sheet.setColumnWidth(6, 250);  // College
            sheet.setColumnWidth(7, 150);  // City
            sheet.setColumnWidth(8, 300);  // GitHub
            sheet.setColumnWidth(9, 300);  // LinkedIn
            sheet.setColumnWidth(10, 200); // WhatsApp Screenshot
            sheet.setColumnWidth(11, 200); // LinkedIn Screenshot
            sheet.setColumnWidth(12, 200); // Instagram Screenshot

            // Freeze the header row
            sheet.setFrozenRows(1);
        }

        // Check for duplicate email
        const emailColumn = 4; // Email is in column D (4th column)
        const lastRow = sheet.getLastRow();

        if (lastRow > 1) {
            const emailRange = sheet.getRange(2, emailColumn, lastRow - 1, 1);
            const emails = emailRange.getValues().flat();

            if (emails.includes(data.email)) {
                return ContentService
                    .createTextOutput(JSON.stringify({
                        status: 'error',
                        message: 'This email has already been registered. Each email can only register once.'
                    }))
                    .setMimeType(ContentService.MimeType.JSON);
            }
        }

        // Save screenshots to Google Drive
        const folderId = getOrCreateScreenshotFolder();

        let whatsappLink = 'No screenshot uploaded';
        let linkedinLink = 'No screenshot uploaded';
        let instagramLink = 'No screenshot uploaded';

        if (data.whatsappScreenshot) {
            whatsappLink = saveScreenshotToDrive(
                data.whatsappScreenshot,
                data.whatsappScreenshotName || 'whatsapp_screenshot.png',
                folderId,
                data.name + ' - WhatsApp'
            );
        }

        if (data.linkedinScreenshot) {
            linkedinLink = saveScreenshotToDrive(
                data.linkedinScreenshot,
                data.linkedinScreenshotName || 'linkedin_screenshot.png',
                folderId,
                data.name + ' - LinkedIn'
            );
        }

        if (data.instagramScreenshot) {
            instagramLink = saveScreenshotToDrive(
                data.instagramScreenshot,
                data.instagramScreenshotName || 'instagram_screenshot.png',
                folderId,
                data.name + ' - Instagram'
            );
        }

        // Append the registration data with "Pending Verification" status
        const newRow = [
            new Date(data.timestamp),
            'Pending Verification',
            data.name,
            data.email,
            data.phone,
            data.college,
            data.city,
            data.github,
            data.linkedin,
            whatsappLink,
            linkedinLink,
            instagramLink
        ];

        sheet.appendRow(newRow);

        // Get the row number of the newly added data
        const currentRow = sheet.getLastRow();

        // Format the new row
        const rowRange = sheet.getRange(currentRow, 1, 1, 12);
        rowRange.setVerticalAlignment('middle');

        // Format timestamp
        const timestampCell = sheet.getRange(currentRow, 1);
        timestampCell.setNumberFormat('dd-mmm-yyyy hh:mm:ss AM/PM');

        // Format status cell
        const statusCell = sheet.getRange(currentRow, 2);
        statusCell.setBackground('#fff3cd');
        statusCell.setFontColor('#856404');
        statusCell.setFontWeight('bold');
        statusCell.setHorizontalAlignment('center');

        // Add data validation for status (dropdown)
        const statusValidation = SpreadsheetApp.newDataValidation()
            .requireValueInList(['Pending Verification', 'Verified', 'Rejected'], true)
            .setAllowInvalid(false)
            .build();
        statusCell.setDataValidation(statusValidation);

        // Make email and URLs clickable
        const emailCell = sheet.getRange(currentRow, 4);
        emailCell.setFormula('=HYPERLINK("mailto:' + data.email + '", "' + data.email + '")');

        const githubCell = sheet.getRange(currentRow, 8);
        githubCell.setFormula('=HYPERLINK("' + data.github + '", "' + data.github + '")');

        const linkedinCell = sheet.getRange(currentRow, 9);
        linkedinCell.setFormula('=HYPERLINK("' + data.linkedin + '", "' + data.linkedin + '")');

        // Add alternating row colors for better readability
        if (currentRow % 2 === 0) {
            rowRange.setBackground('#f8f9fa');
        }

        // Send initial confirmation email to participant
        sendParticipantConfirmation(data);

        // Return success response
        return ContentService
            .createTextOutput(JSON.stringify({
                status: 'success',
                message: 'Registration successful! You will receive a confirmation email within 48 hours.'
            }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Log error for debugging
        Logger.log('Error: ' + error.toString());

        // Return error response
        return ContentService
            .createTextOutput(JSON.stringify({
                status: 'error',
                message: 'An error occurred during registration. Please try again or contact support.'
            }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// ========================================
// SCREENSHOT MANAGEMENT FUNCTIONS
// ========================================

// Create or get the screenshot folder in Google Drive
function getOrCreateScreenshotFolder() {
    const folderName = 'BuildFolio 2025 - Registration Screenshots';
    const folders = DriveApp.getFoldersByName(folderName);

    if (folders.hasNext()) {
        return folders.next().getId();
    } else {
        const folder = DriveApp.createFolder(folderName);
        return folder.getId();
    }
}

// Save base64 screenshot to Google Drive
function saveScreenshotToDrive(base64Data, fileName, folderId, customName) {
    try {
        // Remove the data URL prefix (e.g., "data:image/png;base64,")
        const base64Content = base64Data.split(',')[1];

        // Decode base64 to blob
        const blob = Utilities.newBlob(
            Utilities.base64Decode(base64Content),
            'image/png',
            customName + '_' + fileName
        );

        // Get the folder
        const folder = DriveApp.getFolderById(folderId);

        // Create the file in the folder
        const file = folder.createFile(blob);

        // Make the file viewable by anyone with the link
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

        // Return the file URL
        return file.getUrl();

    } catch (error) {
        Logger.log('Screenshot save error: ' + error.toString());
        return 'Error uploading screenshot';
    }
}

// ========================================
// EMAIL NOTIFICATION FUNCTIONS
// ========================================

// Send initial confirmation email
function sendParticipantConfirmation(data) {
    try {
        const subject = '✅ BuildFolio 2025 - Registration Received';

        const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #4285f4 0%, #5f6fee 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">BuildFolio 2025</h1>
          <p style="color: white; margin: 10px 0 0 0;">Portfolio Showcase & Competition</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #4285f4;">Hello ${data.name}! 👋</h2>
          
          <p style="color: #333; line-height: 1.6;">
            Thank you for registering for BuildFolio 2025! We're excited to have you join us.
          </p>
          
          <div style="background-color: #e3f2fd; padding: 20px; border-left: 4px solid #4285f4; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #4285f4;">📋 What's Next?</h3>
            <ol style="color: #333; line-height: 1.8; padding-left: 20px;">
              <li>Our expert judges will carefully review your profile and screenshots</li>
              <li>You will receive your selection status via email after registration closes on <strong>November 10th, 2025</strong></li>
              <li>Check your spam folder if you don't see our email</li>
            </ol>
          </div>
          
          <div style="background-color: #f1f8e9; padding: 20px; border-left: 4px solid #7cb342; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #7cb342;">✅ Your Registration Details</h3>
            <table style="width: 100%; color: #333;">
              <tr>
                <td style="padding: 5px 0;"><strong>Name:</strong></td>
                <td style="padding: 5px 0;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0;"><strong>Email:</strong></td>
                <td style="padding: 5px 0;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0;"><strong>College:</strong></td>
                <td style="padding: 5px 0;">${data.college}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0;"><strong>City:</strong></td>
                <td style="padding: 5px 0;">${data.city}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #fff3cd; padding: 20px; border-left: 4px solid #ff9800; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #ff9800;">⏰ Important Dates</h3>
            <p style="color: #333; margin: 5px 0;">
              <strong>Registration Deadline:</strong> November 10, 2025 11:59 PM IST
            </p>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            <strong>Data Privacy:</strong> Your information is encrypted and securely stored. 
            We follow strict data protection guidelines and will only use your data for BuildFolio 2025.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #666; font-size: 14px; text-align: center;">
            Questions? Contact us at <a href="mailto:techversecommunity7@gmail.com" style="color: #4285f4;">techversecommunity7@gmail.com</a>
          </p>
          
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      </div>
    `;

        MailApp.sendEmail({
            to: data.email,
            subject: subject,
            htmlBody: htmlBody
        });

    } catch (error) {
        Logger.log('Participant confirmation error: ' + error.toString());
    }
}

// Send SELECTION email when status changes to "Verified"
function sendSelectionEmail(email, name, college, city) {
    try {
        const subject = '🎉 Congratulations! You\'re Selected for BuildFolio 2025';

        const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #00C6FF 0%, #0072ff 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 32px;">🎉 CONGRATULATIONS! 🎉</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">BuildFolio 2025</p>
        </div>
        
        <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #00C6FF;">Dear ${name},</h2>
          
          <p style="color: #333; line-height: 1.8; font-size: 16px;">
            We are thrilled to inform you that you have been <strong style="color: #00C6FF;">SELECTED</strong> 
            to participate in BuildFolio 2025! 🚀
          </p>
          
          <div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); padding: 25px; border-radius: 10px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #0072ff; font-size: 20px;">✨ What This Means</h3>
            <p style="color: #333; line-height: 1.8; margin: 10px 0;">
              Your portfolio stood out among numerous talented applicants! Our judges were impressed by 
              your creativity, technical skills, and dedication to the craft.
            </p>
          </div>
          
          <div style="background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); padding: 30px; border-radius: 10px; margin: 25px 0; text-align: center;">
            <h3 style="margin-top: 0; color: white; font-size: 22px;">📱 MANDATORY: Join WhatsApp Group</h3>
            <p style="color: white; line-height: 1.8; font-size: 15px; margin: 15px 0;">
              <strong>IMPORTANT:</strong> You must join our official WhatsApp group to receive all updates, 
              submission guidelines, and important announcements.
            </p>
            <a href="https://chat.whatsapp.com/KxwvBS8yr7yKjrCeIo01rw?mode=wwt" 
               style="display: inline-block; background-color: white; color: #128C7E; padding: 15px 40px; 
                      text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; 
                      margin-top: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
              🚀 Join WhatsApp Group Now
            </a>
            <p style="color: white; font-size: 13px; margin-top: 15px; opacity: 0.9;">
              Click the button above or use this link:<br>
              <span style="background-color: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 5px; font-size: 12px;">
                https://chat.whatsapp.com/KxwvBS8yr7yKjrCeIo01rw
              </span>
            </p>
          </div>
          
          <div style="background-color: #f1f8e9; padding: 25px; border-left: 5px solid #7cb342; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #7cb342; font-size: 20px;">📋 Next Steps</h3>
            <ol style="color: #333; line-height: 1.8; padding-left: 20px; font-size: 15px;">
              <li><strong>Join the WhatsApp group immediately</strong> (mandatory)</li>
              <li>Check your email regularly for further instructions</li>
              <li>Prepare to showcase your amazing portfolio</li>
              <li>Stay tuned for submission guidelines and deadlines</li>
              <li>Follow us on social media for event updates</li>
            </ol>
          </div>
          
          <div style="background-color: #fff3cd; padding: 25px; border-left: 5px solid #ff9800; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #ff9800; font-size: 20px;">🎁 What You'll Get</h3>
            <ul style="color: #333; line-height: 1.8; list-style: none; padding: 0;">
              <li style="padding: 5px 0;">✅ Certificate of participation</li>
              <li style="padding: 5px 0;">✅ Exciting swag for winners</li>
              <li style="padding: 5px 0;">✅ Networking with industry professionals</li>
              <li style="padding: 5px 0;">✅ Showcase your work to a wider audience</li>
              <li style="padding: 5px 0;">✅ Exclusive access to workshops and mentorship</li>
            </ul>
          </div>
          
          <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
            <p style="color: #2e7d32; font-size: 16px; margin: 0;">
              <strong>Your Selection Details</strong>
            </p>
            <p style="color: #666; margin: 10px 0; font-size: 14px;">
              Name: ${name}<br>
              College: ${college}<br>
              City: ${city}
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #333; font-size: 15px; line-height: 1.6; text-align: center;">
            We can't wait to see what you'll create! 🚀<br>
            Welcome to the BuildFolio 2025 family!
          </p>
          
          <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px;">
            Questions? Contact us at <a href="mailto:techversecommunity7@gmail.com" style="color: #00C6FF; text-decoration: none;">techversecommunity7@gmail.com</a>
          </p>
          
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
            Best regards,<br>
            <strong>TechVerse Community Team</strong><br>
            BuildFolio 2025
          </p>
        </div>
      </div>
    `;

        MailApp.sendEmail({
            to: email,
            subject: subject,
            htmlBody: htmlBody
        });

        Logger.log('Selection email sent to: ' + email);

    } catch (error) {
        Logger.log('Selection email error: ' + error.toString());
    }
}

// Send REJECTION email when status changes to "Rejected"
function sendRejectionEmail(email, name) {
    try {
        const subject = 'BuildFolio 2025 - Application Update';

        const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #4285f4 0%, #5f6fee 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">BuildFolio 2025</h1>
          <p style="color: white; margin: 10px 0 0 0;">Portfolio Showcase & Competition</p>
        </div>
        
        <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #4285f4;">Dear ${name},</h2>
          
          <p style="color: #333; line-height: 1.8; font-size: 16px;">
            Thank you for your interest in BuildFolio 2025 and for taking the time to submit your application.
          </p>
          
          <p style="color: #333; line-height: 1.8; font-size: 16px;">
            After careful review by our panel of judges, we regret to inform you that we are unable to 
            accept your application for this edition of BuildFolio.
          </p>
          
          <div style="background-color: #fff3cd; padding: 25px; border-left: 5px solid #ff9800; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #ff9800;">💪 Don't Give Up!</h3>
            <p style="color: #333; line-height: 1.8;">
              We received an overwhelming number of exceptional applications, and this decision 
              was incredibly difficult. We encourage you to:
            </p>
            <ul style="color: #333; line-height: 1.8;">
              <li>Continue building and improving your portfolio</li>
              <li>Stay connected with the TechVerse community</li>
              <li>Look out for future events and opportunities</li>
              <li>Keep learning and growing as a developer/designer</li>
            </ul>
          </div>
          
          <div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #4285f4;">🚀 Stay Connected With Us!</h3>
            <p style="color: #333; line-height: 1.8; margin-bottom: 15px;">
              This is not the end! TechVerse Community regularly hosts various events, 
              workshops, and competitions. Join our community to stay updated:
            </p>
            
            <div style="background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); padding: 20px; border-radius: 8px; margin: 15px 0; text-align: center;">
              <p style="color: white; margin: 0 0 10px 0; font-weight: bold;">📱 Join Our WhatsApp Community</p>
              <a href="https://chat.whatsapp.com/KxwvBS8yr7yKjrCeIo01rw?mode=wwt" 
                 style="display: inline-block; background-color: white; color: #128C7E; padding: 12px 30px; 
                        text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 14px; 
                        margin-top: 5px;">
                Join WhatsApp Group
              </a>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <p style="color: #333; font-weight: bold; margin-bottom: 10px;">Follow Us on Social Media:</p>
              <div style="display: inline-block;">
                <a href="https://www.linkedin.com/company/techverse-community/" 
                   style="display: inline-block; background-color: #0077b5; color: white; padding: 10px 20px; 
                          text-decoration: none; border-radius: 5px; margin: 5px; font-size: 14px;">
                  💼 LinkedIn
                </a>
                <a href="https://www.instagram.com/techverse.community/" 
                   style="display: inline-block; background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
                          color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px; font-size: 14px;">
                  📸 Instagram
                </a>
                <a href="https://twitter.com/TechVerse_In" 
                   style="display: inline-block; background-color: #1DA1F2; color: white; padding: 10px 20px; 
                          text-decoration: none; border-radius: 5px; margin: 5px; font-size: 14px;">
                  🐦 Twitter
                </a>
              </div>
            </div>
          </div>
          
          <div style="background-color: #f1f8e9; padding: 25px; border-radius: 10px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #7cb342;">🌟 Future Opportunities</h3>
            <p style="color: #333; line-height: 1.8;">
              By staying connected with TechVerse Community, you'll get:
            </p>
            <ul style="color: #333; line-height: 1.8;">
              <li>Early notifications about upcoming events and hackathons</li>
              <li>Free workshops and webinars</li>
              <li>Networking opportunities with tech enthusiasts</li>
              <li>Learning resources and mentorship programs</li>
              <li>Access to exclusive tech community benefits</li>
            </ul>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #333; font-size: 15px; line-height: 1.8;">
            We truly appreciate your interest and effort. Keep creating, keep learning, 
            and we hope to see you in future TechVerse events!
          </p>
          
          <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px;">
            Questions or feedback? Contact us at 
            <a href="mailto:techversecommunity7@gmail.com" style="color: #4285f4; text-decoration: none;">techversecommunity7@gmail.com</a>
          </p>
          
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
            Best wishes,<br>
            <strong>TechVerse Community Team</strong><br>
            BuildFolio 2025
          </p>
        </div>
      </div>
    `;

        MailApp.sendEmail({
            to: email,
            subject: subject,
            htmlBody: htmlBody
        });

        Logger.log('Rejection email sent to: ' + email);

    } catch (error) {
        Logger.log('Rejection email error: ' + error.toString());
    }
}

// ========================================
// STATUS CHANGE TRIGGER (onEdit)
// ========================================

function onEdit(e) {
    try {
        const sheet = e.source.getActiveSheet();
        const range = e.range;

        // Check if the edited cell is in the Status column (column 2)
        if (range.getColumn() === 2) {
            const row = range.getRow();

            // Skip if it's the header row
            if (row === 1) return;

            const newStatus = range.getValue();
            const oldStatus = e.oldValue;

            // Only send email if status actually changed
            if (newStatus === oldStatus) return;

            // Get participant details from the row
            const rowData = sheet.getRange(row, 1, 1, 12).getValues()[0];
            const name = rowData[2];      // Column C
            const email = rowData[3];     // Column D
            const college = rowData[5];   // Column F
            const city = rowData[6];      // Column G

            // Send appropriate email based on new status
            if (newStatus === 'Verified') {
                sendSelectionEmail(email, name, college, city);

                // Update status cell color to green
                range.setBackground('#d4edda');
                range.setFontColor('#155724');

            } else if (newStatus === 'Rejected') {
                sendRejectionEmail(email, name);

                // Update status cell color to red
                range.setBackground('#f8d7da');
                range.setFontColor('#721c24');

            } else if (newStatus === 'Pending Verification') {
                // Yellow color for pending
                range.setBackground('#fff3cd');
                range.setFontColor('#856404');
            }
        }

    } catch (error) {
        Logger.log('onEdit error: ' + error.toString());
    }
}

// ========================================
// TEST FUNCTION
// ========================================

function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({
            status: 'success',
            message: 'BuildFolio 2025 Registration API is active and running!'
        }))
        .setMimeType(ContentService.MimeType.JSON);
}

// ========================================
// MANUAL TEST FUNCTIONS (for debugging)
// ========================================

function testSelectionEmail() {
    sendSelectionEmail(
        'test@example.com',
        'Test User',
        'Test College',
        'Test City'
    );
    Logger.log('Test selection email sent');
}

function testRejectionEmail() {
    sendRejectionEmail(
        'test@example.com',
        'Test User'
    );
    Logger.log('Test rejection email sent');
}
