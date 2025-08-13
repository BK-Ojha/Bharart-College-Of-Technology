import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import SideNavbar from './CommonComponents/SideNavbar'
import Dashboard from './Components/Dashboard'
import StudentList from './Components/StudentList'
import Enquiries from './Components/Enquiries'
import { Toastifier } from './CommonComponents/Toastifier'
import CourseList from './Components/CourseList'
import { Col, Row } from 'react-bootstrap'
import LoginForm from './Components/LoginForm'
import { useAuth } from './CommonComponents/AuthContext'
import UserProfile from './Components/UserProfile'
import Notification from './Components/Notification'
import SubjectList from './Components/SubjectList'
import FeesStructure from './Components/FeesStructure'
import ApplyFees from './Components/ApplyFees'
import StudentFees from './Components/StudentFees'
import FeesCollection from './Components/FeesCollection'
import TakeFees from './Components/TakeFees'

function App() {
  const { user } = useAuth()
  const location = useLocation()
  const isLoginPage = location.pathname === '/Login'
  const navigate = useNavigate()
  if (!user && !isLoginPage) {
    return <Navigate to="/Login" replace />
  }

  // const generateBreadcrumb = (path) => {
  //   const mapping = {
  //     dashboard: 'Dashboard',
  //     students: 'Manage Student / Students',
  //     enquiries: 'Manage Enquiry / Enquiries',
  //     courses: 'Manage Course / Courses',
  //     subjects: 'Manage Course / Subjects',
  //     "fees/structure": 'Manage Fees / Fees / Structure',
  //     ApplyFees: 'Manage Fees / Apply Fees',
  //     TakeFees: 'Manage Fees / Take Fees',
  //     Notification: 'Notifications',
  //     UserProfile: 'User Profile',
  //   }

  //   const segments = path.split('/').filter(Boolean) // Remove empty strings
  //   if (segments.length === 0) return 'Dashboard'
  //   return segments
  //     .map((segment, index) => {
  //       if (segment === 'UserProfile' && segments[index + 1])
  //         return 'User Profile'
  //       return mapping[segment] || segment.replace(/([A-Z])/g, ' $1').trim()
  //     })
  //     .join(' / ')
  // }

  const generateBreadcrumb = (path) => {
  const mapping = {
    dashboard: 'Dashboard',
    students: 'Manage Student / Students',
    enquiries: 'Manage Enquiry / Enquiries',
    courses: 'Manage Course / Courses',
    subjects: 'Manage Course / Subjects',
    'fees/structure': 'Manage Fees / Fees / Structure',
    "apply/fees": 'Manage Fees / Apply / Fees',
    "student/fees": 'Manage Fees / Student / Fees',
    "fees/collection": 'Manage Fees / Fees / Collection',
    "take/fees": 'Manage Fees / Take / Fees',
    notification:
     'Notifications',
    "my/profile": 'My / Profile',
  };

  // Remove leading slash and make lowercase
  const cleanPath = path.replace(/^\//, '').toLowerCase();

  // Direct mapping if exists
  if (mapping[cleanPath]) {
    return mapping[cleanPath];
  }

  // If no direct match, split and capitalize each segment
  return cleanPath
    .split('/')
    .map(
      (segment) =>
        segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()
    )
    .join(' / ');
};

  return (
    <>
      <style>
        {`
            .scrolling-text {
              overflow: hidden;
              white-space: nowrap;
              box-sizing: border-box;
              width: 100%;
              color: #333;
              font-weight: 500;
              position: relative;
            }

            .scrolling-text span {
              display: inline-block;
              padding-left: 100%;
              animation: scroll-text 30s linear infinite;
            }

            @keyframes scroll-text {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-100%);
              }
            }
        `}
      </style>
      <Toastifier />

      <div
        className="d-flex"
        style={{ height: '100vh', overflow: 'hidden', marginBottom: '-2rem' }}
      >
        {!isLoginPage && user && <SideNavbar />}

        <div
          className="flex-grow-1 p-3 d-flex flex-column"
          style={{ overflowY: 'auto' }}
        >
          {!isLoginPage && user && (
            <>
              <Row className="align-items-center">
                <Col className="text-center">
                  <h2 className="text-dark fw-bold text-uppercase mb-0">
                    Bharat College Of Technology
                  </h2>
                  <div className="scrolling-text mt-2">
                    <span>
                      Bharat College of Technology is committed to excellence in
                      technical education, innovation, and research, fostering
                      professionals equipped with skills, knowledge, and values
                      to shape a better future.
                    </span>
                  </div>
                </Col>

                <Col xs="auto" className="d-flex flex-column align-items-end">
                  <div
                    onClick={() => navigate('/my/profile')}
                    style={{ cursor: 'pointer' }}
                    className="d-flex align-items-center gap-3"
                  >
                    <img
                      src={user.image}
                      alt="User"
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />

                    <div className="text-end">
                      {user?.role === 'admin' && (
                        <div className="text-warning fw-bold small text-uppercase">
                          Admin
                        </div>
                      )}
                      {user?.role === 'student' && (
                        <div className="text-info fw-bold small text-uppercase">
                          Student
                        </div>
                      )}
                      <div className="fw-semibold text-dark">
                        {user?.name?.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="text-end text-muted fw-semibold small mt-2">
                    {generateBreadcrumb(location.pathname.charAt(0).toUpperCase() + location.pathname.slice(1).toUpperCase())}
                  </div>
                </Col>
              </Row>
            </>
          )}

          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/Login" element={<LoginForm />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/enquiries" element={<Enquiries />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/subjects" element={<SubjectList />} />
            <Route path="/fees/structure" element={<FeesStructure />} />
            <Route path="/apply/fees" element={<ApplyFees />} />
            <Route path="/student/fees" element={<StudentFees />} />
            <Route path="/fees/collection" element={<FeesCollection />} />
            <Route path="/take/fees" element={<TakeFees />} />
            <Route path="/my/profile/:student_id?" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
