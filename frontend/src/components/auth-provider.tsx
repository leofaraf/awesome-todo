import axios, { AxiosInstance } from "axios"
import {constants} from "@/lib/constants"
import { Component, ComponentType, ElementType, createContext, useContext, useEffect, useState } from "react"
import React from 'react';
import { Navigate, useNavigate } from "react-router-dom"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Input } from "@/components/ui/input";

export type AuthState = {
    token: string | null,
    isAuthorized: boolean,
    client: AxiosInstance | null,
    authModal: {
        isActive: boolean,
        toogleActive: () => void
    }
}

type AuthProviderProps = {
    children: React.ReactNode
}

const initialState: AuthState = {
    token: null,
    isAuthorized: false,
    client: null,
    authModal: {isActive: false, toogleActive: () => {}}
}

export const AuthContext = createContext<AuthState>(initialState)

export function Protected({element}: {element: React.ReactNode }) {
    const authContext = useContext(AuthContext)

    return authContext.isAuthorized ? element : (
        <Navigate to={"/"} />
    )
}

export function AuthProvider({children, ...props}: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(null)
    const [isAuthorized, setAuthorized] = useState<boolean>(false)
    const [client, setClient] = useState<AxiosInstance | null>(null)
    const [isActive, setActive] = useState<boolean>(false)
    const toogleActive = () => {
        setActive(!isActive)
    }

    const logout = () => {
        setAuthorized(false)
        setToken(null)
    }
    
    const createAxiosClient = (): AxiosInstance => {
        const client = axios.create({
            baseURL: constants.API_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        client.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = constants.AUTH_PREFIX + token
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        )
    
        client.interceptors.response.use(
            (response) => {
                return response;
            },
    
            (error) => {
                if (error?.response.status === 401) {
                    logout()
                }
                return error;
            }
        )
    
        return client;
    }


    const authorize = (login?: string, password?: string) => {
        if (login && password) {
             
        } else {

        }
    }

    useEffect(() => {
        setClient(createAxiosClient())
        console.log("Test")
    }, [token])

    return (
        <AuthContext.Provider {...props} value={{
            token,
            isAuthorized,
            client,
            authModal: {isActive, toogleActive}
        }}>
            {children}
        </AuthContext.Provider>
    )
}