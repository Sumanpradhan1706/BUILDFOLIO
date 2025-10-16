import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertCircle, Shield, Clock, Mail, Users } from 'lucide-react';
import coverImage from '@/assets/cover image of BuildFolio.jpg';

interface FormData {
    name: string;
    email: string;
    phone: string;
    college: string;
    github: string;
    linkedin: string;
    city: string;
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
            // Replace this URL with your Google Apps Script Web App URL
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxGgikiaBAX8Rp5tpdumFkuY7xge0FxON5tniQbtQZvSUn5sVSFHJQbP8lPlzwqzO42/exec';

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

            <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    {/* Cover Image */}
                    <div className="mb-6 md:mb-8 rounded-xl md:rounded-2xl overflow-hidden border border-primary/20 shadow-lg hover-glow">
                        <img
                            src={coverImage}
                            alt="BuildFolio 2025 Cover"
                            className="w-full h-auto max-h-[200px] md:max-h-[300px] lg:max-h-[400px] object-contain bg-background"
                        />
                    </div>

                    {/* Main Card */}
                    <Card className="bg-glass border-primary/20 shadow-2xl backdrop-blur-xl">
                        <CardHeader className="text-center space-y-4 pb-8 border-b border-primary/10">
                            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-neon-glow rounded-full flex items-center justify-center mb-2 glow-neon">
                                <Users className="w-10 h-10 text-dark-space" />
                            </div>
                            <CardTitle className="text-4xl md:text-5xl font-black glow-neon text-primary">
                                BuildFolio 2025
                            </CardTitle>
                            <CardDescription className="text-xl md:text-2xl font-semibold gradient-text">
                                Portfolio Showcase & Competition
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 md:p-8 space-y-8">
                            {/* Event Information - Glass morphism style */}
                            <div className="space-y-4">
                                <div className="bg-glass p-6 rounded-xl border border-primary/20 hover-glow">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Shield className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-primary mb-2 font-orbitron">Verification Process</h3>
                                            <p className="text-foreground/80 leading-relaxed">
                                                After registration, our panel of expert judges will carefully review your profile.
                                                You will receive your selection status via email after registration closes on <strong className="text-primary">November 10th, 2025</strong> once your application is verified.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-glass p-6 rounded-xl border border-primary/20 hover-glow">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-primary mb-2 font-orbitron">Registration Deadline</h3>
                                            <p className="text-foreground/80 leading-relaxed">
                                                <strong className="text-primary text-lg">{REGISTRATION_DEADLINE}</strong>
                                                <br />
                                                Don't miss out! Register early to secure your spot.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-glass p-6 rounded-xl border border-primary/20 hover-glow">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-primary mb-2 font-orbitron">Fair & Transparent</h3>
                                            <p className="text-foreground/80 leading-relaxed">
                                                Every application is reviewed with utmost care and fairness. Your data is encrypted and
                                                securely stored. We value your privacy and follow strict data protection guidelines.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Registration Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-base font-semibold text-foreground">
                                        Full Name <span className="text-primary">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your Full Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`h-12 bg-glass border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                        disabled={isSubmitting}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email and Phone in Grid */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-base font-semibold text-foreground">
                                            Email Address <span className="text-primary">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@gmail.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`h-12 bg-glass border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            disabled={isSubmitting}
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-400 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-base font-semibold text-foreground">
                                            Phone Number <span className="text-primary">*</span>
                                        </Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="9876543210"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`h-12 bg-glass border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            disabled={isSubmitting}
                                            maxLength={10}
                                        />
                                        {errors.phone && (
                                            <p className="text-sm text-red-400 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* College and City in Grid */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* College Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="college" className="text-base font-semibold text-foreground">
                                            College/University <span className="text-primary">*</span>
                                        </Label>
                                        <Input
                                            id="college"
                                            name="college"
                                            type="text"
                                            placeholder="ABC University"
                                            value={formData.college}
                                            onChange={handleInputChange}
                                            className={`h-12 bg-glass border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary ${errors.college ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            disabled={isSubmitting}
                                        />
                                        {errors.college && (
                                            <p className="text-sm text-red-400 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.college}
                                            </p>
                                        )}
                                    </div>

                                    {/* City Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="city" className="text-base font-semibold text-foreground">
                                            City <span className="text-primary">*</span>
                                        </Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            type="text"
                                            placeholder="Mumbai"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={`h-12 bg-glass border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary ${errors.city ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            disabled={isSubmitting}
                                        />
                                        {errors.city && (
                                            <p className="text-sm text-red-400 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.city}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* GitHub Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="github" className="text-base font-semibold text-foreground">
                                        GitHub Profile URL <span className="text-primary">*</span>
                                    </Label>
                                    <Input
                                        id="github"
                                        name="github"
                                        type="url"
                                        placeholder="https://github.com/yourusername"
                                        value={formData.github}
                                        onChange={handleInputChange}
                                        className={`h-12 bg-glass border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary ${errors.github ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                        disabled={isSubmitting}
                                    />
                                    {errors.github && (
                                        <p className="text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.github}
                                        </p>
                                    )}
                                    <p className="text-xs text-foreground/60">
                                        Your GitHub profile helps us understand your coding experience
                                    </p>
                                </div>

                                {/* LinkedIn Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin" className="text-base font-semibold text-foreground">
                                        LinkedIn Profile URL <span className="text-primary">*</span>
                                    </Label>
                                    <Input
                                        id="linkedin"
                                        name="linkedin"
                                        type="url"
                                        placeholder="https://linkedin.com/in/yourusername"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                        className={`h-12 bg-glass border-primary/30 text-foreground placeholder:text-foreground/40 focus:border-primary ${errors.linkedin ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                        disabled={isSubmitting}
                                    />
                                    {errors.linkedin && (
                                        <p className="text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.linkedin}
                                        </p>
                                    )}
                                    <p className="text-xs text-foreground/60">
                                        Connect with us professionally through LinkedIn
                                    </p>
                                </div>

                                {/* Terms and Conditions - Glass morphism style */}
                                <div className="space-y-3 p-6 bg-glass rounded-xl border border-primary/20">
                                    <div className="flex items-start space-x-3">
                                        <Checkbox
                                            id="terms"
                                            checked={formData.termsAccepted}
                                            onCheckedChange={handleCheckboxChange}
                                            disabled={isSubmitting}
                                            className={`mt-1 border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary ${errors.termsAccepted ? 'border-red-500' : ''}`}
                                        />
                                        <div className="flex-1">
                                            <Label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-relaxed cursor-pointer text-foreground/90"
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
                                        <p className="text-sm text-red-400 flex items-center gap-1 ml-7">
                                            <AlertCircle className="w-4 h-4" />
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
                                            <CheckCircle2 className="h-5 w-5 text-primary" />
                                        ) : (
                                            <AlertCircle className="h-5 w-5" />
                                        )}
                                        <AlertTitle className="font-semibold font-orbitron">
                                            {submitStatus.type === 'success' ? 'Success!' : 'Error'}
                                        </AlertTitle>
                                        <AlertDescription className="text-sm">
                                            {submitStatus.message}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-dark-space shadow-lg hover-glow font-orbitron glow-neon"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Processing Your Registration...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="mr-2 h-5 w-5" />
                                            Submit Registration
                                        </>
                                    )}
                                </Button>

                                {/* Footer Info - Glass morphism style */}
                                <div className="text-center space-y-3 pt-4">
                                    <div className="flex items-center justify-center gap-2 text-foreground/70">
                                        <Shield className="w-4 h-4 text-primary" />
                                        <span className="text-sm">Your data is encrypted and securely stored</span>
                                    </div>
                                    <p className="text-xs text-foreground/60">
                                        Need help? Contact us at{' '}
                                        <a href="mailto:techversecommunity7@gmail.com" className="text-primary hover:text-primary/80 hover:underline transition-colors">
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
