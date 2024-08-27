"use client";

import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import {HiPaperAirplane} from "react-icons/hi2";

interface MessageInputProps {
    placeholder?: string;
    id: string,
    type?: string
    required?: boolean
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors

}


const MessageInput: React.FC<MessageInputProps> = ({
                                                       placeholder,
                                                       id,
                                                       type,
                                                       required,
                                                       register,
                                                       errors
                                                   }) => {
    return (
        <div className="relative w-full">
            <textarea
                id={id}
                autoComplete={id}

                {...register(id, { required })}
                placeholder={placeholder}
                className="
                text-black
                font-light
                py-2
                px-4
                bg-neutral-100
                w-full
                rounded-2xl
                focus:outline-none
                h-10
                "/>

        </div>
    )
};
export default MessageInput;