
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Logout() {
    
    const navigate = useNavigate()

    localStorage.clear()

    useEffect(() => {
        (localStorage.getItem("token") === null) ? navigate('/UserLogin') : navigate('/Logout')
    })

    return (

        <> </>
    )
}

export default Logout

