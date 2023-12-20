import { useState, useContext, useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import "../../css/header.css";

import { Context } from "../../context/dataContext"
import { useNavigate, Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search'
import { Dropdown } from "react-bootstrap"
import { isLogin, isLogout } from "../../utils/isLogins"
import dashicon from "../../assets/dashboardIcon.svg";
import activeplusicon from "../../assets/icons/activeplusicon.svg";
import logoutIcon from "../../assets/logouticon.svg";

import logo1 from "../../assets/header-logo.png"
import logo from "../../assets/logo.png"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {

  const navi = useNavigate();
  const [errors, setErrors] = useState({});
  const [scrolling, setScrolling] = useState(false);
  const [visible, setVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { handleChangeQuery, query, isSearchPage } = useContext(Context)

  const [navigation, setNavigation] = useState([
    { name: 'Home', href: '/', current: true },
    { name: 'Forum', href: '/forum', current: false },
    { name: 'Find Massage', href: '/spa', current: false },
    { name: 'Masseuse', href: '/masseuse', current: false },
    { name: 'Manage Businesses', href: '/for-business', current: false },
    // { name: 'Advertise', href: '/advertisers', current: false },
  ])

  useEffect(() => {
    function onScroll() {
      setScrolling(window.scrollY > 60)
  }
  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', onScroll)

  onScroll()

  return function () {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  }
  },[window.scrollY]);

  const submitHandler = () => {

    let errors = {};

    if (!query) {
      errors["query"] = "Search is required";
    }

    if (Object.keys(errors).length <= 0) {
      navi("/search", { state: { userType: "" } });

    } else {
      setErrors(errors);
    }
  };

  const handleLogout = () => {
    isLogout();
    // window.location.reload(true);
    navi('/')
  };

  const handleClick = () => {
    navi("/login");
  };
  
  const handleSignUp = () => {
    navi("/signup");
  };

  const handleKeypress = (e) => {
    if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
      submitHandler();
    }
  };

  const navClick = (e, index) => {
    navi(e.href);
    setVisible(false);
    const tNavication = [...navigation]

    for (let i = 0; i < tNavication.length; i ++) {
      if (index === i) tNavication[i].current = true
      else tNavication[i].current = false
    }
    setNavigation(tNavication)
  };

  return (
    <Disclosure as="nav" className={`fixed w-full z-50 border-b border-opacity-75 ${
      scrolling
          ? 'bg-opacity-80 shadow-md md:py-[0px] bg-white transition-all duration-700 text-[] border-none'
          : 'md:py-[6px] bg-white transition-transform duration-1000'
      }`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 max-w-[1600px] nav-pad">
            <div className="relative flex h-30 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:invisible">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => {setMobileMenuOpen(true);setVisible(!visible);}}
                >
                  {open ? (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 justify-between sm:items-stretch sm:justify-start size">
                <div className="flex flex-shrink-0 items-center">
                  <img src={logo1} href="/" className="cursor-pointer mx-auto my-auto h-12 mt-2 mb-2" />                 
                </div>
                <div className="hidden sm:ml-6 md:block">
                  <div className="flex">
                    {navigation.map((item, index) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={()=>navClick(item, index)}
                        className={classNames(
                          item.current ? ' border-b border-[#c8175d] text-[#c8175d] font-bold' : 'text-[#4f4f4f]',
                          `mx-[8px] my-[4px] lg:mx-[24px] lg:my-[24px] rounded-none text-base font-medium cursor-pointer md:flex md:items-center md:mx-[12px] md:my-[24px] whitespace-nowrap ${
                            scrolling
                                ? ' text-[#4f4f4f] hover:!text-[#c8175d]'
                                : 'hover:text-[#c8175d]'
                            }`
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {isSearchPage ? "" : <>
                    <div class="input-group header-search-bar" style={{
                        display: "flex",
                        alignItems: "center",
                        color:"white"
                        // display: "none"
                    }}>
                      <input
                        value={query}
                        type="search"
                        onChange={handleChangeQuery}
                        name="query"
                        onKeyPress={handleKeypress}
                        required
                        className="form-control"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                        style={{background:"none",}}
                      />
                      <SearchIcon style={{
                      marginleft: "5px",
                      fontSize: "32px",
                      cursor: "pointer"
                      }}
                      className="text-[#c8175d]"
                      onClick={submitHandler} />
                    </div>
                    </>}
                  </div>
                </div>
              </div>

              <div className={`lg:hidden`}>
                <div className={`fixed inset-0 z-10 bg-black/40 ${!visible ? ' d-none' : ' d-block transition duration-500'}`} onClick={() => setVisible(!visible)} />
                <div className={`fixed inset-y-0 left-0 z-10 w-full xxs:w-72 md:w-80 overflow-y-auto shadow-sm bg-[#c8175d] transition duration-300 ${!visible ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100' }`}>
                  <button
                    type="button"
                    className="rounded-md m-6 text-[#ffffffc2] hover:text-white float-right"
                    onClick={() => {setMobileMenuOpen(true);setVisible(!visible);}}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  {/* <div className="flex items-center justify-between mt-4 mr-4">
                    <img src={logo} href="/" className="mx-auto my-auto w-40" />
                  </div> */}
                  <div className="mt-6 m-2.5 w-[96px]">
                    <img src={logo} href="/" className="w-32 cursor-pointer" />
                  </div>
                  <div className="flex flex-col space-y-1 mt-3">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={()=>navClick(item, index)}
                      className={classNames(
                        item.current ? 'before:absolute before:top-1 before:bottom-1 before:-left-1 before:block before:w-2 before:rounded-3xl before:bg-white' : 'text-[#ffffffc2]',
                        `relative flex text-base px-4 py-1.5 text-[#ffffffc2] hover:text-white`
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                    ))}
                    <div className='flex px-4 pt-3'>
                      <input
                        value={query}
                        type="search"
                        onChange={handleChangeQuery}
                        name="query"
                        onKeyPress={handleKeypress}
                        required
                        className="rounded px-1.5 w-full text-[#4f4f4f] focus-visible:outline-none"
                        placeholder="Search here..."
                        // aria-label="Search"
                        // aria-describedby="search-addon"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 xl:pr-[6px] lg:pr-[4px]">
                <Dropdown className="h-inline mx-2 popup-main-account" style={{ textAlign: "center" }}>
                {isLogin() ? (
                  <>
                    <Dropdown.Toggle
                      className="popup-account ml-15 active:bg-none"
                    >
                      <div className="h-userImg -mr-8 ">
                        {Array?.from(localStorage?.getItem("userName"))[0]}
                      </div>
                    </Dropdown.Toggle>
                  </>
                ) : (
                  <div className="inline-flex">
                    <button
                      style={{
                        backgroundColor: "#c8175d",
                        border: "1px solid #c01c5b",
                        paddingLeft:"18px",
                        paddingRight:"18px",
                        color: "white",
                      }}
                      type="button"
                      onClick={handleClick}
                      className="rounded-md -mr-6 btn-small md:p-1 text-base md:-mr-0"
                    > 
                      Log In
                    </button>
                    <button
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "#c8175d",
                        border: "1px solid #c8175d",
                        color: "white",
                        paddingLeft: "12px",
                        paddingRight: "12px"
                      }}
                      type="button"
                      onClick={handleSignUp}
                      className="rounded-md btn-small max-[900px]:hidden mx-[900px]:flex md:p-1 text-base"
                    >
                      Sign Up
                    </button>
                  </div>
                )}

                <Dropdown.Menu className="topRight inline-flex right-0 w-[300px]">
                  <div className="center" >
                    <span className="user-name">
                      {localStorage.getItem("userName")}
                    </span>
                  </div>
                  <Dropdown.Item
                    className="mr-10 flex"
                    onClick={() => navi("/account/spa", { state: { linkId: 2 } })}
                  >
                    <img src={activeplusicon} />{" "}
                    <span className="ml-2.5">
                      {" "}
                      Manage Massage Business Pages{" "}
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="mr-10 flex"
                    onClick={() =>
                      navi("/account/masseuse", { state: { linkId: 3 } })
                    }
                  >
                    <img src={activeplusicon} />{" "}
                    <span className="ml-2.5">
                      {" "}
                      Manage Masseuse Profile Page{" "}
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="mr-10 flex"
                    onClick={() =>
                      navi("/account/profile", { state: { linkId: 1 } })
                    }
                  >
                    <img src={dashicon} />{" "}
                    <span className="ml-3"> Account Settings </span>
                  </Dropdown.Item>

                  <Dropdown.Item className="mr-10 flex" onClick={() => handleLogout()}>
                    <img src={logoutIcon} />{" "}
                    <span className="ml-2.5">Logout</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>
            </div>
          </div>
        </>
      )}

    </Disclosure>
  )
}
