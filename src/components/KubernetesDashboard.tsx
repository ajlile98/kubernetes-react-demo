'use client';
import { useEffect, useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export const KubernetesDashboard = () => {
    const [namespaces, setNamespaces] = useState([])
    const [namespace, setNamespace] = useState('default')
    const [pods, setPods] = useState([])

    useEffect(() => {
        fetch('/api/namespaces')
            .then(res => res.json())
            .then(data => {
                setNamespaces(data.data.namespaces.items)
            })
        }, [])
    useEffect(() => {
        fetch(`/api/namespaces/${namespace}/pods`)
            .then(res => res.json())
            .then(data => {
                setPods(data.data.pods.items)
            })
        }, [namespace])
    return (
        <div>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                    >
                       Select Namespace 
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    {namespaces.map(namespace => <DropdownItem key={namespace?.metadata?.name} onClick={() => setNamespace(namespace?.metadata?.name)}>{namespace?.metadata?.name}</DropdownItem>)}
                </DropdownMenu>
            </Dropdown>
            <ul>
                {pods.map(_ => <li>{JSON.stringify(_?.metadata?.name)}</li>)}
            </ul>
        </div>
    )
}