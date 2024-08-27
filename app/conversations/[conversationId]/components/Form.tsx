"use client";


import useConversation from "@/app/hooks/useConversation";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {HiPaperAirplane, HiPhoto} from "react-icons/hi2";
import MessageInput from "@/app/conversations/[conversationId]/components/MessageInput";
import {CldUploadButton} from "next-cloudinary"

const Form = () => {
    const {conversationId} = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', {shouldValidate: true});
        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    };

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }

    return(
        <div
        className="
        py-4
        px-4
        bg-white
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
        "
        >
        <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={handleUpload}
        uploadPreset="yfevgpkf">
            <HiPhoto size={30}
                     className="text-orange-500"/>
        </CldUploadButton>
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-2 lg:gap-4 w-full"
            >
              <MessageInput
              id="message"
              register={register}
              errors={errors}
              required
              placeholder="Сообщение"
              />
                <button
                type="submit"
                className="
                rounded-full
                p-2
                bg-orange-500
                cursor-pointer
                hover:db-orange-600
                transition

                ">
                <HiPaperAirplane size={18}
                className='text-white'/>

            </button>

            </form>
        </div>
    )
};
export default Form;