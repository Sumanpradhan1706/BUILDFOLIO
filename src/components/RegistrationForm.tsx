import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertCircle, Shield, Clock, Mail, Users, MessageCircle, Linkedin, Instagram, Upload } from 'lucide-react';
import coverImage from '@/assets/cover image of BuildFolio.jpg';

interface FormData {
    name: string;
    email: string;
    phone: string;
    college: string;
    github: string;
    linkedin: string;
    city: string;
    joinedWhatsApp: boolean;
    followedLinkedIn: boolean;
    followedInstagram: boolean;
    whatsappScreenshot: File | null;
    linkedinScreenshot: File | null;
    instagramScreenshot: File | null;
    termsAccepted: boolean;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    college?: string;
    github?: string;
    linkedin?: string;
    city?: string;
    socialMedia?: string;
    whatsappScreenshot?: string;
    linkedinScreenshot?: string;
    instagramScreenshot?: string;
    termsAccepted?: string;
}

export default function RegistrationForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        college: '',
        github: '',
        linkedin: '',
        city: '',
        joinedWhatsApp: false,
        followedLinkedIn: false,
        followedInstagram: false,
        whatsappScreenshot: null,
        linkedinScreenshot: null,
        instagramScreenshot: null,
        termsAccepted: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    // Registration deadline
    const REGISTRATION_DEADLINE = 'November 10, 2025 11:59 PM IST';

    // Spam prevention: Check if user has submitted recently
    const checkSpamPrevention = (): boolean => {
        const lastSubmission = localStorage.getItem('lastRegistrationTime');
        const userEmail = localStorage.getItem('registeredEmail');

        if (lastSubmission && userEmail === formData.email) {
            const timeDiff = Date.now() - parseInt(lastSubmission);
            const hoursSinceLastSubmission = timeDiff / (1000 * 60 * 60);

            if (hoursSinceLastSubmission < 24) {
                setSubmitStatus({
                    type: 'error',
                    message: 'You have already registered! Please wait 24 hours before registering again.',
                });
                return false;
            }
        }

        return true;
    };

    // Validate form fields
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'Name must be at least 3 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        // College validation
        if (!formData.college.trim()) {
            newErrors.college = 'College/University name is required';
        } else if (formData.college.trim().length < 3) {
            newErrors.college = 'College name must be at least 3 characters';
        }

        // GitHub validation
        if (!formData.github.trim()) {
            newErrors.github = 'GitHub profile URL is required';
        } else if (!formData.github.includes('github.com/')) {
            newErrors.github = 'Please enter a valid GitHub profile URL';
        }

        // LinkedIn validation
        if (!formData.linkedin.trim()) {
            newErrors.linkedin = 'LinkedIn profile URL is required';
        } else if (!formData.linkedin.includes('linkedin.com/')) {
            newErrors.linkedin = 'Please enter a valid LinkedIn profile URL';
        }

        // City validation
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        } else if (formData.city.trim().length < 2) {
            newErrors.city = 'City name must be at least 2 characters';
        }

        // Social media validation (mandatory for better selection)
        if (!formData.joinedWhatsApp || !formData.followedLinkedIn || !formData.followedInstagram) {
            newErrors.socialMedia = 'Please complete all social media requirements for better selection chances';
        }

        // Screenshot validation
        if (!formData.whatsappScreenshot) {
            newErrors.whatsappScreenshot = 'WhatsApp screenshot is required';
        }
        if (!formData.linkedinScreenshot) {
            newErrors.linkedinScreenshot = 'LinkedIn screenshot is required';
        }
        if (!formData.instagramScreenshot) {
            newErrors.instagramScreenshot = 'Instagram screenshot is required';
        }

        // Terms acceptance validation
        if (!formData.termsAccepted) {
            newErrors.termsAccepted = 'You must accept the terms and conditions to proceed';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error for this field when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, termsAccepted: checked }));
        if (errors.termsAccepted) {
            setErrors((prev) => ({ ...prev, termsAccepted: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus({ type: null, message: '' });

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Check spam prevention
        if (!checkSpamPrevention()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Convert files to base64
            const toBase64 = (file: File): Promise<string> => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = (error) => reject(error);
                });
            };

            const whatsappScreenshotBase64 = formData.whatsappScreenshot
                ? await toBase64(formData.whatsappScreenshot)
                : null;
            const linkedinScreenshotBase64 = formData.linkedinScreenshot
                ? await toBase64(formData.linkedinScreenshot)
                : null;
            const instagramScreenshotBase64 = formData.instagramScreenshot
                ? await toBase64(formData.instagramScreenshot)
                : null;

            // Replace this URL with your Google Apps Script Web App URL
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzy5e7D0fg6JAMIxhOCbCyOlr9Ev6l07Q3m1QQjm58pIf6q_rayEp0rxllIbwnbtLMk/exec';

            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    college: formData.college,
                    github: formData.github,
                    linkedin: formData.linkedin,
                    city: formData.city,
                    whatsappScreenshot: whatsappScreenshotBase64,
                    whatsappScreenshotName: formData.whatsappScreenshot?.name,
                    linkedinScreenshot: linkedinScreenshotBase64,
                    linkedinScreenshotName: formData.linkedinScreenshot?.name,
                    instagramScreenshot: instagramScreenshotBase64,
                    instagramScreenshotName: formData.instagramScreenshot?.name,
                    timestamp: new Date().toISOString(),
                }),
            });

            // Since we're using no-cors, we can't read the response
            // Assume success if no error was thrown
            setSubmitStatus({
                type: 'success',
                message: 'Registration successful! Our judges will review your application and You will receive your selection status via email after registration closes on November 10th, 2025..',
            });

            // Store submission info for spam prevention
            localStorage.setItem('lastRegistrationTime', Date.now().toString());
            localStorage.setItem('registeredEmail', formData.email);

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                college: '',
                github: '',
                linkedin: '',
                city: '',
                joinedWhatsApp: false,
                followedLinkedIn: false,
                followedInstagram: false,
                whatsappScreenshot: null,
                linkedinScreenshot: null,
                instagramScreenshot: null,
                termsAccepted: false,
            });

        } catch (error) {
            console.error('Registration error:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Registration failed. Please try again or contact support.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background">
            {/* Same background as main page */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-space-deep to-background" />

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-glow/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    {/* Cover Image */}
                    <div className="mb-4 sm:mb-6 md:mb-8 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-primary/20 shadow-lg hover-glow">
                        <img
                            src={coverImage}
                            alt="BuildFolio 2025 Cover"
                            className="w-full h-auto max-h-[150px] sm:max-h-[200px] md:max-h-[300px] lg:max-h-[400px] object-contain bg-background"
                        />
                    </div>

                    {/* Main Card */}
                    <Card className="bg-glass border-primary/20 shadow-2xl backdrop-blur-xl">
                        <CardHeader className="text-center space-y-3 sm:space-y-4 pb-6 sm:pb-8 border-b border-primary/10">
                            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-neon-glow rounded-full flex items-center justify-center mb-2 glow-neon">
                                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-dark-space" />
                            </div>
                            <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black glow-neon text-primary px-2">
                                BuildFolio 2025
                            </CardTitle>
                            <CardDescription className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold gradient-text px-2">
                                Portfolio Showcase & Competition
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                            {/* Event Information - Glass morphism style */}
                            <div className="space-y-3 sm:space-y-4">
                                <div className="bg-glass p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-primary/20 hover-glow">
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-base sm:text-lg text-primary mb-1.5 sm:mb-2 font-orbitron">Verification Process</h3>
                                            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                                                After registration, our panel of expert judges will carefully review your profile.
                                                You will receive your selection status via email after registration closes on <strong className="text-primary">November 10th, 2025</strong> once your application is verified.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-glass p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-primary/20 hover-glow">
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-base sm:text-lg text-primary mb-1.5 sm:mb-2 font-orbitron">Registration Deadline</h3>
                                            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                                                <strong className="text-primary text-base sm:text-lg">{REGISTRATION_DEADLINE}</strong>
                                                <br />
                                                Don't miss out! Register early to secure your spot.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-glass p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-primary/20 hover-glow">
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-base sm:text-lg text-primary mb-1.5 sm:mb-2 font-orbitron">Fair & Transparent</h3>
                                            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                                                Every application is reviewed with utmost care and fairness. Your data is encrypted and
                                                securely stored. We value your privacy and follow strict data protection guidelines.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Registration Form */}
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm sm:text-base font-semibold text-foreground">
                                        Full Name <span className="text-primary">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your Full Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`h-11 sm:h-12 text-sm sm:text-base bg-glass border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                        disabled={isSubmitting}
                                    />
                                    {errors.name && (
                                        <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email and Phone in Grid */}
                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm sm:text-base font-semibold text-foreground">
                                            Email Address <span className="text-primary">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@gmail.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`h-11 sm:h-12 text-sm sm:text-base bg-glass border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            disabled={isSubmitting}
                                        />
                                        {errors.email && (
                                            <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1">
                                                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-sm sm:text-base font-semibold text-foreground">
                                            Phone Number <span className="text-primary">*</span>
                                        </Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="9876543210"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`h-11 sm:h-12 text-sm sm:text-base bg-glass border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            disabled={isSubmitting}
                                            maxLength={10}
                                        />
                                        {errors.phone && (
                                            <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1">
                                                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* College and City in Grid */}
                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                                    {/* College Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="college" className="text-sm sm:text-base font-semibold text-foreground">
                                            College/University <span className="text-primary">*</span>
                                        </Label>
                                        <Input
                                            id="college"
                                            name="college"
                                            type="text"
                                            placeholder="ABC University"
                                            value={formData.college}
                                            onChange={handleInputChange}
                                            className={`h-11 sm:h-12 text-sm sm:text-base bg-glass border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary ${errors.college ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            disabled={isSubmitting}
                                        />
                                        {errors.college && (
                                            <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1">
                                                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                {errors.college}
                                            </p>
                                        )}
                                    </div>

                                    {/* City Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="city" className="text-sm sm:text-base font-semibold text-foreground">
                                            City <span className="text-primary">*</span>
                                        </Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            type="text"
                                            placeholder="Mumbai"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={`h-11 sm:h-12 text-sm sm:text-base bg-glass border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary ${errors.city ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            disabled={isSubmitting}
                                        />
                                        {errors.city && (
                                            <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1">
                                                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                {errors.city}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* GitHub Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="github" className="text-sm sm:text-base font-semibold text-foreground">
                                        GitHub Profile URL <span className="text-primary">*</span>
                                    </Label>
                                    <Input
                                        id="github"
                                        name="github"
                                        type="url"
                                        placeholder="https://github.com/yourusername"
                                        value={formData.github}
                                        onChange={handleInputChange}
                                        className={`h-11 sm:h-12 text-sm sm:text-base bg-glass border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary ${errors.github ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                        disabled={isSubmitting}
                                    />
                                    {errors.github && (
                                        <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            {errors.github}
                                        </p>
                                    )}
                                    <p className="text-xs sm:text-sm text-foreground/60">
                                        Your GitHub profile helps us understand your coding experience
                                    </p>
                                </div>

                                {/* LinkedIn Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin" className="text-sm sm:text-base font-semibold text-foreground">
                                        LinkedIn Profile URL <span className="text-primary">*</span>
                                    </Label>
                                    <Input
                                        id="linkedin"
                                        name="linkedin"
                                        type="url"
                                        placeholder="https://linkedin.com/in/yourusername"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                        className={`h-11 sm:h-12 text-sm sm:text-base bg-glass border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary ${errors.linkedin ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                        disabled={isSubmitting}
                                    />
                                    {errors.linkedin && (
                                        <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            {errors.linkedin}
                                        </p>
                                    )}
                                    <p className="text-xs sm:text-sm text-foreground/60">
                                        Connect with us professionally through LinkedIn
                                    </p>
                                </div>

                                {/* Social Media Requirements - Mandatory for Better Selection */}
                                <div className="space-y-3 sm:space-y-4 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-primary/10 via-neon-glow/5 to-primary/5 rounded-lg sm:rounded-xl border-2 border-primary/30 hover-glow">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center glow-neon">
                                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-base sm:text-lg text-primary font-orbitron">Join Our Community</h3>
                                            <p className="text-xs sm:text-sm text-foreground/80">
                                                <span className="text-primary font-semibold">Mandatory</span> for better selection chances
                                            </p>
                                        </div>
                                    </div>

                                    {/* WhatsApp Community */}
                                    <div className="space-y-3 p-3 sm:p-4 bg-glass rounded-lg border border-primary/20">
                                        <div className="flex items-start space-x-2.5 sm:space-x-3">
                                            <Checkbox
                                                id="whatsapp"
                                                checked={formData.joinedWhatsApp}
                                                onCheckedChange={(checked) => {
                                                    setFormData((prev) => ({ ...prev, joinedWhatsApp: checked as boolean }));
                                                    if (errors.socialMedia) {
                                                        setErrors((prev) => ({ ...prev, socialMedia: undefined }));
                                                    }
                                                }}
                                                disabled={isSubmitting}
                                                className={`mt-0.5 sm:mt-1 border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary ${errors.socialMedia ? 'border-red-500' : ''}`}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <Label
                                                    htmlFor="whatsapp"
                                                    className="text-xs sm:text-sm font-medium leading-relaxed cursor-pointer text-foreground/90 flex items-center gap-2 flex-wrap"
                                                >
                                                    <MessageCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    <span>I have joined the TechVerse WhatsApp Community <span className="text-primary">*</span></span>
                                                </Label>
                                                <a
                                                    href="https://chat.whatsapp.com/DRBBLzTOMndAEaf7e9Ddq9"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block mt-2 text-xs sm:text-sm text-primary hover:text-primary/80 underline hover:no-underline transition-all"
                                                >
                                                    Click here to join WhatsApp Community →
                                                </a>
                                            </div>
                                        </div>

                                        {/* WhatsApp Screenshot Upload */}
                                        <div className="space-y-2 pl-0 sm:pl-7">
                                            <Label htmlFor="whatsappScreenshot" className="text-xs sm:text-sm font-medium text-foreground/90">
                                                Upload Screenshot Proof <span className="text-primary">*</span>
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="whatsappScreenshot"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0] || null;
                                                        setFormData((prev) => ({ ...prev, whatsappScreenshot: file }));
                                                        if (errors.whatsappScreenshot) {
                                                            setErrors((prev) => ({ ...prev, whatsappScreenshot: undefined }));
                                                        }
                                                    }}
                                                    disabled={isSubmitting}
                                                    className={`text-xs sm:text-sm bg-glass border-primary/30 text-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 ${errors.whatsappScreenshot ? 'border-red-500' : ''}`}
                                                />
                                                {formData.whatsappScreenshot && (
                                                    <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        {formData.whatsappScreenshot.name}
                                                    </p>
                                                )}
                                            </div>
                                            {errors.whatsappScreenshot && (
                                                <p className="text-xs text-red-400 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.whatsappScreenshot}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* LinkedIn Page */}
                                    <div className="space-y-3 p-3 sm:p-4 bg-glass rounded-lg border border-primary/20">
                                        <div className="flex items-start space-x-2.5 sm:space-x-3">
                                            <Checkbox
                                                id="linkedinFollow"
                                                checked={formData.followedLinkedIn}
                                                onCheckedChange={(checked) => {
                                                    setFormData((prev) => ({ ...prev, followedLinkedIn: checked as boolean }));
                                                    if (errors.socialMedia) {
                                                        setErrors((prev) => ({ ...prev, socialMedia: undefined }));
                                                    }
                                                }}
                                                disabled={isSubmitting}
                                                className={`mt-0.5 sm:mt-1 border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary ${errors.socialMedia ? 'border-red-500' : ''}`}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <Label
                                                    htmlFor="linkedinFollow"
                                                    className="text-xs sm:text-sm font-medium leading-relaxed cursor-pointer text-foreground/90 flex items-center gap-2 flex-wrap"
                                                >
                                                    <Linkedin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                    <span>I follow TechVerse on LinkedIn <span className="text-primary">*</span></span>
                                                </Label>
                                                <a
                                                    href="https://www.linkedin.com/company/techversecommunity/about/?viewAsMember=true"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block mt-2 text-xs sm:text-sm text-primary hover:text-primary/80 underline hover:no-underline transition-all"
                                                >
                                                    Click here to follow on LinkedIn →
                                                </a>
                                            </div>
                                        </div>

                                        {/* LinkedIn Screenshot Upload */}
                                        <div className="space-y-2 pl-0 sm:pl-7">
                                            <Label htmlFor="linkedinScreenshot" className="text-xs sm:text-sm font-medium text-foreground/90">
                                                Upload Screenshot Proof <span className="text-primary">*</span>
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="linkedinScreenshot"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0] || null;
                                                        setFormData((prev) => ({ ...prev, linkedinScreenshot: file }));
                                                        if (errors.linkedinScreenshot) {
                                                            setErrors((prev) => ({ ...prev, linkedinScreenshot: undefined }));
                                                        }
                                                    }}
                                                    disabled={isSubmitting}
                                                    className={`text-xs sm:text-sm bg-glass border-primary/30 text-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 ${errors.linkedinScreenshot ? 'border-red-500' : ''}`}
                                                />
                                                {formData.linkedinScreenshot && (
                                                    <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        {formData.linkedinScreenshot.name}
                                                    </p>
                                                )}
                                            </div>
                                            {errors.linkedinScreenshot && (
                                                <p className="text-xs text-red-400 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.linkedinScreenshot}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Instagram Page */}
                                    <div className="space-y-3 p-3 sm:p-4 bg-glass rounded-lg border border-primary/20">
                                        <div className="flex items-start space-x-2.5 sm:space-x-3">
                                            <Checkbox
                                                id="instagramFollow"
                                                checked={formData.followedInstagram}
                                                onCheckedChange={(checked) => {
                                                    setFormData((prev) => ({ ...prev, followedInstagram: checked as boolean }));
                                                    if (errors.socialMedia) {
                                                        setErrors((prev) => ({ ...prev, socialMedia: undefined }));
                                                    }
                                                }}
                                                disabled={isSubmitting}
                                                className={`mt-0.5 sm:mt-1 border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary ${errors.socialMedia ? 'border-red-500' : ''}`}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <Label
                                                    htmlFor="instagramFollow"
                                                    className="text-xs sm:text-sm font-medium leading-relaxed cursor-pointer text-foreground/90 flex items-center gap-2 flex-wrap"
                                                >
                                                    <Instagram className="w-4 h-4 text-pink-500 flex-shrink-0" />
                                                    <span>I follow TechVerse on Instagram <span className="text-primary">*</span></span>
                                                </Label>
                                                <a
                                                    href="https://www.instagram.com/wearetechverse/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block mt-2 text-xs sm:text-sm text-primary hover:text-primary/80 underline hover:no-underline transition-all"
                                                >
                                                    Click here to follow on Instagram →
                                                </a>
                                            </div>
                                        </div>

                                        {/* Instagram Screenshot Upload */}
                                        <div className="space-y-2 pl-0 sm:pl-7">
                                            <Label htmlFor="instagramScreenshot" className="text-xs sm:text-sm font-medium text-foreground/90">
                                                Upload Screenshot Proof <span className="text-primary">*</span>
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="instagramScreenshot"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0] || null;
                                                        setFormData((prev) => ({ ...prev, instagramScreenshot: file }));
                                                        if (errors.instagramScreenshot) {
                                                            setErrors((prev) => ({ ...prev, instagramScreenshot: undefined }));
                                                        }
                                                    }}
                                                    disabled={isSubmitting}
                                                    className={`text-xs sm:text-sm bg-glass border-primary/30 text-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 ${errors.instagramScreenshot ? 'border-red-500' : ''}`}
                                                />
                                                {formData.instagramScreenshot && (
                                                    <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        {formData.instagramScreenshot.name}
                                                    </p>
                                                )}
                                            </div>
                                            {errors.instagramScreenshot && (
                                                <p className="text-xs text-red-400 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.instagramScreenshot}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {errors.socialMedia && (
                                        <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1 mt-2">
                                            <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            {errors.socialMedia}
                                        </p>
                                    )}
                                </div>

                                {/* Terms and Conditions - Glass morphism style */}
                                <div className="space-y-2.5 sm:space-y-3 p-4 sm:p-5 md:p-6 bg-glass rounded-lg sm:rounded-xl border border-primary/20">
                                    <div className="flex items-start space-x-2.5 sm:space-x-3">
                                        <Checkbox
                                            id="terms"
                                            checked={formData.termsAccepted}
                                            onCheckedChange={handleCheckboxChange}
                                            disabled={isSubmitting}
                                            className={`mt-0.5 sm:mt-1 border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary ${errors.termsAccepted ? 'border-red-500' : ''}`}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <Label
                                                htmlFor="terms"
                                                className="text-xs sm:text-sm font-medium leading-relaxed cursor-pointer text-foreground/90"
                                            >
                                                I hereby confirm that all the information provided above is accurate and complete.
                                                I understand that this data will be used solely for the purpose of ensuring a smooth
                                                and fair competition process. I consent to the verification of my details by the
                                                judging panel and agree to receive official communication regarding BuildFolio 2025
                                                via email. <span className="text-primary">*</span>
                                            </Label>
                                        </div>
                                    </div>
                                    {errors.termsAccepted && (
                                        <p className="text-xs sm:text-sm text-red-400 flex items-center gap-1 ml-6 sm:ml-7">
                                            <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            {errors.termsAccepted}
                                        </p>
                                    )}
                                </div>

                                {/* Status Messages */}
                                {submitStatus.type && (
                                    <Alert
                                        variant={submitStatus.type === 'error' ? 'destructive' : 'default'}
                                        className={
                                            submitStatus.type === 'success'
                                                ? 'border-primary bg-primary/10 text-foreground backdrop-blur-xl'
                                                : 'bg-glass backdrop-blur-xl'
                                        }
                                    >
                                        {submitStatus.type === 'success' ? (
                                            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                        ) : (
                                            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                        )}
                                        <AlertTitle className="text-sm sm:text-base font-semibold font-orbitron">
                                            {submitStatus.type === 'success' ? 'Success!' : 'Error'}
                                        </AlertTitle>
                                        <AlertDescription className="text-xs sm:text-sm">
                                            {submitStatus.message}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold bg-primary hover:bg-primary/90 text-dark-space shadow-lg hover-glow font-orbitron glow-neon"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                                            <span className="text-sm sm:text-base">Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                            <span className="text-sm sm:text-base">Submit Registration</span>
                                        </>
                                    )}
                                </Button>

                                {/* Footer Info - Glass morphism style */}
                                <div className="text-center space-y-2 sm:space-y-3 pt-3 sm:pt-4">
                                    <div className="flex items-center justify-center gap-2 text-foreground/70">
                                        <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                                        <span className="text-xs sm:text-sm">Your data is encrypted and securely stored</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-foreground/60 px-2">
                                        Need help? Contact us at{' '}
                                        <a href="mailto:techversecommunity7@gmail.com" className="text-primary hover:text-primary/80 hover:underline transition-colors break-all">
                                            techversecommunity7@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
