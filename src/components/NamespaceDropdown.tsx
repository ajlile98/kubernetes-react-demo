"use client"

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export const NamespaceDropdown = ({namespaces}) => {
    return (
        <div>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                    >
                        Open Menu
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    {namespaces.map(namespace => <DropdownItem key="{namespace}">{namespace}</DropdownItem>)}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}