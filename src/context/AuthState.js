import AuthContext from "./AuthContext";



const AuthState = (props) => {
    const authState = {
        token: localStorage.getItem("token"),
        userDetailsId: localStorage.getItem("userDetailsId")
    }
    return (
        <AuthContext.Provider value={authState}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState