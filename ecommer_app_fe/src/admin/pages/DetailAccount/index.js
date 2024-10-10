import { Card, Skeleton,Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';
import { getRoleDetailAction, getRolesAction } from '../../../redux/actions/RoleAction';
import BoxHead from '../../components/BoxHead';

function DetailAccount() {
    const [show,setShow] = useState(false)
    const {collapsed} = useOutletContext()
    const {id} = useParams()
    const dispatch = useDispatch()
    
    const stateAccount = useSelector(state=>state.AccountReducer)
    const stateRole = useSelector(state=>state.RoleReducer)
    const [account,setAccount] = useState({})
    const [role,setRole] = useState({})
    
    const fetchId =()=>{
        dispatch(getRolesAction())
        const newAccount = stateAccount.accounts.find(item=>item._id ===id);
            if(newAccount){
                setAccount(newAccount);
                
                return true
            }
            
            
        
    }
    useEffect(()=>{
        let x=fetchId();
        if(x){
            setShow(true)
        }
    },[id,dispatch])

    useEffect(()=>{
        const newRole = stateRole.roles.find(item=>item._id == account.role_id);
        if(newRole){
            setRole(newRole)
        }
    },[stateRole])
//    console.log(stateRole);
    
    return (
        <>
        {show?(
            <>
                <div
                className={`transition-all duration-300  ${
                collapsed
                    ? "ml-[100px] w-[calc(100%-100px)]"
                    : "ml-[230px] w-[calc(100%-230px)]"
                } mt-[20px] mr-[20px]`}
            >

                <BoxHead text={`${account.fullName}`}/>

                <Card
                    className='shadow-md'
                    
                >
                    {account.avatar &&<Image height={200} width={200} src={account.avatar}/>}
                    <p>Email: <span className='font-medium'>{account.email}</span></p>
                    <p>Phone: <span className='font-medium'>{account.phone}</span></p>
                    <p>Vai trò: <span className='font-medium'>{role.title || "không có quyền"}</span></p>
                    
                    
                </Card>
            </div>
            
            </>
        ):(
            <Skeleton active className='mt-10'/>
        )}
            
        </>
    );
}

export default DetailAccount;