import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getProductCategoryAction } from "../../../redux/client/actions/ProductCategoryAction";
import { checkUserApi, createCardIdApi } from "../../../utils/apiClient";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function Default() {
    const dispatch = useDispatch();
    const [value, setValue] = useState();
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = `${name}=${value || ""}${expires}; path=/;`;
    };
    const [cardId ,setCardId] = useState(getCookie("cardId"))
    const location = useLocation()

    const validateUserToken = async () => {
        const userToken = localStorage.getItem("user_token");
        if (userToken) {
            try {
                const res = await checkUserApi(userToken);
                console.log(res);
                if (res.code !== 200) {
                    localStorage.removeItem("user_token");
                }
            
            } catch (error) {
                localStorage.removeItem("user_token");
                
            }
        }
    };

    useEffect(() => {
        validateUserToken();  // Validate token on initial load and whenever the route changes
    }, [location,navigate]);
    

    useEffect(()=>{
        const fetch = async()=>{
            
            // console.log(cardId);
            if(!cardId){
                // console.log("vaoday");
                const res =await createCardIdApi()
                console.log(res);
                if(res.code==200){
                    setCookie("cardId", res.cardId, 365)
                    setCardId(res.cardId)
                    
                }
                setLoading(false)

            }
            else{
                setCookie("cardId", cardId, 365)
                setLoading(false)
            }
            
            
        }
        fetch()
    },[navigate,cardId])

    useEffect(() => {
        if(!loading){
            dispatch(getProductCategoryAction()); 
            
        }
    }, [dispatch,loading],cardId);
    // console.log(getCookie("cardId"));


    
    

   

    if(loading){
        return <>...loading</>
    }

    return (
        <>
            {!loading &&(
                <>
                    <Layout style={{ minHeight: '100vh' }}>
                        <Header value={value} setValue={setValue} />
                        <Content className="h-full bg-white">
                            <Outlet />
                        </Content>
                        <Footer />
                    </Layout>
                    
                </>
            )}
            
        </>
    );
}

export default Default;
