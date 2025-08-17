'use client'

import React, { useEffect, useState } from 'react'

import {useCustomers, useMain, useStater} from "@/hooks/useStater";
import {useActions} from "@/hooks/useActions";

import styles from "@/app/css/user.module.css"
import Link from "next/link";

const User = ({}) => {

    useEffect(() => {

    })

    return(
        <div>

        </div>
    )
}

export const ProfileIcon = ({}) => {

    const customer = useCustomers();
    const main = useMain()
    const {toggleModal} = useActions()

    useEffect(() => {
        //console.log(customer)
    },[customer.authStatus])

    useEffect(() => {
        ////console.log(main.showModal)
    },[main, main.mobile])

    if(customer.authStatus) {
        return(
            <div>
                <Link href = "/routes/cabinet">
                    <div className={styles.wordName}>
                        {
                            (customer.name) ? customer.name[0].toUpperCase() : "о_О"
                        }
                    </div>
                </Link>
            </div>
        )
    }
    if(!customer.authStatus) {
        return(
            <div className='w-[45px] h-[45px] bg-yelloow-default'
                onClick={(evt) => {
                    if(!main.mobile) toggleModal('modals_auth');
                }}
                onTouchStart={() =>{
                    if(main.mobile) toggleModal('modals_auth');
                }}
            >
                    <svg xmlns="https://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                        <path d="M11.5 11.4999C14.0312 11.4999 16.0833 9.44789 16.0833 6.91659C16.0833 4.38528 14.0312 2.33325 11.5 2.33325C8.96866 2.33325 6.91663 4.38528 6.91663 6.91659C6.91663 9.44789 8.96866 11.4999 11.5 11.4999Z" fill="white"/>
                        <path d="M11.5001 13.7915C6.90759 13.7915 3.1676 16.8715 3.1676 20.6665C3.1676 20.9232 3.36927 21.1248 3.62594 21.1248H19.3742C19.6309 21.1248 19.8325 20.9232 19.8325 20.6665C19.8325 16.8715 16.0926 13.7915 11.5001 13.7915Z" fill="white"/>
                    </svg>
            </div>
        )
    }

}


export default  User;
