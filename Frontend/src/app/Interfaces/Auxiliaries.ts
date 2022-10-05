interface HasID {
    id: number
}

interface NavbarLink {
    href: string
    name: string
}

interface KeyReplacement<Type> {
    key: keyof Type
    replacement: string
}

interface MessageInfo {
    message: string
    type: 'error' | 'warning' | 'success' | 'none'
}

export {
    HasID,
    NavbarLink,
    KeyReplacement,
    MessageInfo
}