import {
  FaBell,
  FaBookOpen,
  FaCog,
  FaRupeeSign,
  FaTachometerAlt,
  FaUserGraduate,
} from 'react-icons/fa'
import { useAuth } from './AuthContext'
import Login from '../Components/Login'
import { useNavigate } from 'react-router-dom'
import { useNotification } from './NotificationContext'
import { MdSend } from 'react-icons/md'
import { useState } from 'react'

export default function SideNavbar() {
  const { user } = useAuth()
  console.log(user)
  const navigate = useNavigate()
  const { count } = useNotification()
  console.log('count', count)
  const [openMenu, setOpenMenu] = useState(null)

  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName))
  }

  return (
    <div
      className="d-flex flex-column vh-100  bg-dark"
      style={{ width: '280px' }}
    >
      <div
        onClick={() => navigate('/dashboard')}
        className="d-flex justify-content-center align-items-center w-100 "
      >
        <img
          src="/logo.png"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          alt="Logo"
        />
      </div>

      <hr style={{ color: 'white' }} />
     <div style={{height:"80%", overflowY:"auto", marginBottom:"20px",scrollbarWidth:"none",     msOverflowStyle: "none" // IE/Edge
}}>
       <ul className="nav nav-pills flex-column mb-auto">
        {user?.role === 'admin' && (
          <li className="nav-item">
            <a
              href="/notification"
              // className="nav-link text-white"
              className={`nav-link ${count > 0 ? 'text-danger' : 'text-white'}`}
              aria-current="page"
            >
              <FaBell /> Notification
              <span className="ms-1">{count}</span>
            </a>
          </li>
        )}

        {user?.role === 'admin' && (
          <li className="nav-item">
            <a
              href="/dashboard"
              className="nav-link text-white"
              aria-current="page"
            >
              <FaTachometerAlt /> Dashboard
            </a>
          </li>
        )}


        {/* Student Management */}
        {(user?.role !== 'student' || user?.role === 'admin') && (
          <li>
            <button
              onClick={() => toggleMenu('students')}
              className="nav-link btn btn-toggle align-items-center rounded collapsed text-white"
            >
              <FaUserGraduate /> Manage Students
            </button>
    
            {openMenu === 'students' && (
              <div>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small text-center">
                  <li>
                    <a
                      href="/students"
                      className="link-white text-white nav-link ps-4"
                    >
                      Student
                    </a>
                   
                  </li>
                </ul>
              </div>
            )}
          </li>
        )}

        {/* Courses  */}
        {user?.role === 'admin' && (
          <li>
            <button
              onClick={() => toggleMenu('courses')}
              className="nav-link btn btn-toggle align-items-center rounded collapsed text-white"
            >
              <FaBookOpen /> Manage Courses
            </button>
    
            {openMenu === 'courses' && (
              <div>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small text-center">
                  <li>
                    <a
                      href="/courses"
                      className="link-white text-white nav-link ps-4"
                    >
                      Courses
                    </a>
                   
                  </li>

                  <li>
                    <a
                      href="/subjects"
                      className="link-white text-white nav-link ps-4"
                    >
                      Subjects
                    </a>
                   
                  </li>
                </ul>
              </div>
            )}
          </li>
        )}
        {user?.role === 'admin' && (
          <li>
            <button
              onClick={() => toggleMenu('fees')}
              className="nav-link btn btn-toggle align-items-center rounded collapsed text-white"
            >
              <FaRupeeSign />
              Manage Fees
            </button>
    
            {openMenu === 'fees' && (
              <div>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small justify-content-start">
                  <li>
                    <a
                      href="/fees/structure"
                      className="link-white text-white nav-link ps-4"
                    >
                      Fees Structure
                    </a>
                   
                  </li>
                  <li>
                    <a
                      href="/apply/fees"
                      className="link-white text-white nav-link ps-4"
                    >
                    Apply Fees
                    </a>
                   
                  </li>
                  <li>
                    <a
                      href="/student/fees"
                      className="link-white text-white nav-link ps-4"
                    >
                      Student Fees
                    </a>                 
                  </li>
                  <li>
                 
                  </li>
                  <li>
                    <a
                      href="/fees/collection"
                      className="link-white text-white nav-link ps-4"
                    >
                      Fees Collection
                    </a>  
                      
                  </li>
                
                  <li>
                    <a href='/take/fees' className='link-white text-white nav-link ps-4' style={{marginBottom:"-20px"}}>
                      Take Fees
                    </a>'
                  </li>
                </ul>
              </div>
            )}
          </li>
        )}
        <li className="nav-item " >
          <a
            href="/my/profile"
            className="nav-link text-white"
            aria-current="page"
          >
            <FaCog /> Setting
          </a>
        </li>
        <li className="nav-item">
          <Login />
        </li>
      </ul>
     </div>
    </div>
  )
}
