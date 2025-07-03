
import AuthForm from '../components/AuthForm';

const Login = () => {
    return (
        <section className='w-full mt-10'>
            <p className='text-center text-teal-600 text-3xl font-semibold'>Login</p>
            <AuthForm isLogin={true}/>
        </section>
    );
}

export default Login;
