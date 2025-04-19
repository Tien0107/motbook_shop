import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import authService from '../services/authService';
import useAuthStore from '../stores/authStore';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Must be a valid email'),
    password: yup.string().required('Password is required')
});

const LoginForm = () => {
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const { email, password } = data;
            
            const response = await authService.login(email, password);
            if (response) {
                login(response.data);
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="relative">
                <input
                    {...register('email')}
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                    placeholder="Email address"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>
            <div className="relative">
                <div className="relative">
                    <input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                        placeholder="Password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-3 text-gray-600"
                    >
                        {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
            </div>
            <div className="relative">
                <button 
                    type="submit"
                    className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-black transition-colors"
                >
                    Log in
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
