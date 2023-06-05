import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryLogo from '../../components/Logo/PrimaryLogo'
import SignupForm from '../../containers/Forms/Signup'
import { useAppDispatch, useAppSelector } from '../../app/hooks/storeHooks'
import { constRoles, constEvents, constLocation } from '../../app/constants/BasicConstants'
import { roleIsLearner, roleIsTutor, setEvent } from './publicSlice';
import LoginForm from '../../containers/Forms/Login';
import SetPassword from '../../containers/Forms/SetPassword';
import VerifyEmail from '../../containers/Forms/VerifyEmail';

const AuthLayout: React.FC = () => {
  const { event, role } = useAppSelector(state => state.public)
  const dispatch = useAppDispatch()
  const location = useLocation();
  const navigate = useNavigate()
  const currentRoute = location.pathname;

  if (currentRoute === constLocation.login) {
    dispatch(setEvent(constEvents.login));
  } else if (currentRoute === constLocation.learnerSignup) {
    dispatch(roleIsLearner());
    dispatch(setEvent(constEvents.signup));
  } else if (currentRoute === constLocation.tutorSignup) {
    dispatch(roleIsTutor());
    dispatch(setEvent(constEvents.signup));
  } else if (currentRoute === constLocation.setPassword) {
    dispatch(setEvent(constEvents.setPassword))
  } else if (currentRoute === constLocation.VerifyEmail) {
    dispatch(setEvent(constEvents.VerifyEmail))
  } else if (currentRoute === constLocation.forgotPassword) {
    dispatch(setEvent(constEvents.forgotPassword))
  } else if (currentRoute === constLocation.resetPassword) {
    dispatch(setEvent(constEvents.resetPassword))
  } else {
    dispatch(setEvent(constEvents.unknownEvent))
    navigate('/404-not-found')
  }

  return (
    <div className='w-[100%] h-screen flex items-center justify-around'>
      <div>
        <PrimaryLogo />
        <span className='text-light_primary_text dark:text-dark_primary_text font-semibold text-2xl font-mono'>
          {
            event === constEvents.signup && role === constRoles.tutor ? "Start new Teaching Career with" :
              event === constEvents.signup && role === constRoles.learner ? "Start learning with" :
                event === constEvents.setPassword ? "Secure your way of" :
                  event === constEvents.VerifyEmail || event === constEvents.resetPassword ? "You're just one step away from" :
                    event === constEvents.forgotPassword ? "Recover your account and get back to" :
                      "Experience seamless access from"

          }
        </span> <br />
        <span className='text-oedark dark:text-gray-300 font-semibold text-6xl'>Open Education</span> <br />
      </div>
      {
        event === constEvents.signup ? <SignupForm /> :
          event === constEvents.setPassword ? <SetPassword /> :
            event === constEvents.VerifyEmail ? <VerifyEmail /> :
              <LoginForm />
      }
    </div>

  )
}

export default AuthLayout