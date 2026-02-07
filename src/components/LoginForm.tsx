import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Facebook, Linkedin, Twitter } from 'lucide-react';


// --- Types & Schema ---
const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
}

export default function LoginForm({ showPassword, setShowPassword }: LoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        console.log('Form Data:', data);
        // Simulate login
    };

    // --- Spotlight Logic ---
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            className="relative w-full max-w-md p-8 rounded-2xl overflow-hidden bg-black/30 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Spotlight Effect */}
            <div
                className={`absolute pointer-events-none w-[400px] h-[400px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-0'
                    }`}
                style={{
                    transform: `translate(${mousePosition.x - 200}px, ${mousePosition.y - 200}px)`,
                    transition: 'transform 0.1s ease-out',
                }}
            />

            <div className="relative z-10 flex flex-col gap-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-purple-200 drop-shadow-sm">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-blue-200/60">Enter your credentials to access the cosmos</p>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-4 py-2">
                    <SocialIcon icon={<Facebook size={20} />} href="#" gradient="from-blue-600 to-blue-400" />
                    <SocialIcon icon={<Twitter size={20} />} href="#" gradient="from-sky-500 to-sky-300" />
                    <SocialIcon icon={<Linkedin size={20} />} href="#" gradient="from-blue-700 to-blue-500" />
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs text-white/40 uppercase tracking-wider">or</span>
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Email Input */}
                    <AppInput
                        id="email"
                        placeholder="Email Address"
                        type="email"
                        register={register('email')}
                        error={errors.email?.message}
                    />

                    {/* Password Input */}
                    <AppInput
                        id="password"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        register={register('password')}
                        error={errors.password?.message}
                        icon={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-white/50 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        }
                    />

                    <div className="flex justify-end">
                        <a href="#" className="text-xs text-blue-300/80 hover:text-white transition-colors">
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="group relative w-full overflow-hidden rounded-lg bg-white/10 p-[1px] transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(120,60,255,0.3)]"
                    >
                        <div className="relative h-full w-full bg-black/40 backdrop-blur-sm rounded-lg px-4 py-3 transition-all group-hover:bg-transparent">
                            <span className="relative z-10 font-semibold tracking-wide text-white">SIGN IN</span>
                        </div>
                        {/* Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                    </button>
                </form>
            </div>
        </div>
    );
}

// --- Helper Components ---

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    register?: any;
    error?: string;
}

const AppInput = ({ placeholder, icon, register, error, ...rest }: AppInputProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <div className="group relative w-full">
            <div className="relative w-full rounded-lg bg-white/5 p-[1px] transition-all duration-300 focus-within:bg-gradient-to-r focus-within:from-blue-500 focus-within:to-purple-500">
                <div className="relative rounded-lg bg-black/40">
                    <input
                        className={`
                        peer w-full rounded-lg bg-transparent px-4 py-3 font-light text-white outline-none placeholder:text-white/30
                        ${error ? 'text-red-200' : ''}
                    `}
                        placeholder={placeholder}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        {...register}
                        {...rest}
                    />
                </div>
            </div>

            {/* Cursor Glow on Input Border */}
            {isHovering && (
                <div
                    className="absolute inset-0 rounded-lg pointer-events-none opacity-50 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 40%)`
                    }}
                />
            )}

            {/* Dynamic Border Lines (User's request) */}
            {isHovering && (
                <>
                    <div
                        className="absolute pointer-events-none top-0 left-0 right-0 h-[1px] z-20 rounded-t-md overflow-hidden bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 transition-opacity duration-300 peer-focus:opacity-100"
                        style={{
                            left: mousePosition.x - 50,
                            width: 100,
                            opacity: 0.7
                        }}
                    />
                </>
            )}

            {/* Icon */}
            {icon && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
                    {icon}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <span className="text-xs text-red-400 mt-1 ml-1">{error}</span>
            )}
        </div>
    )
}

function SocialIcon({ icon, href, gradient }: { icon: React.ReactNode, href: string, gradient: string }) {
    return (
        <a
            href={href}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-white/30"
        >
            <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-20`} />
            <span className="relative z-10 text-white/70 transition-colors group-hover:text-white">
                {icon}
            </span>
        </a>
    )
}
