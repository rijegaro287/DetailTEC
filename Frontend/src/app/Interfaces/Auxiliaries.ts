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

interface DateInput {
    year: number
    month: number
    day: number
}

interface TimeInput {
    hour: number
    minute: number
    second: number
}

interface SelectOption {
    value: string
    text: string
    disabled?: boolean
}

export {
    NavbarLink,
    KeyReplacement,
    MessageInfo,
    DateInput,
    TimeInput,
    SelectOption
}