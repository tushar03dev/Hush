import './LoginPage.css';
import {useForm} from 'react-hook-form';

const LoginPage = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (formData) => {
        console.log(formData); // For debugging
    };
    return (
        <>
            <div className="loginPage">
                <h1>Login</h1>
                <p>Enter your work email and password to access your account</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Email
                        <input {...register("email")} placeholder="name@example.com" />
                    </label>
                    <label>
                        Password
                        <input {...register("password")} />
                    </label>
                </form>
            </div>
        </>
    );
}

export default LoginPage;



