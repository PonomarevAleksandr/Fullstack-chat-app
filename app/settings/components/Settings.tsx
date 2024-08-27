"use client"; // Add this directive at the top of the file

import { User } from "@prisma/client";
import SettingsModal from "@/app/components/sidebar/SettingsModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "@/app/components/Button";

interface SettingsProps {
    currentUser: User;
}

const Settings: React.FC<SettingsProps> = ({ currentUser }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image,
        },
    });

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, { shouldValidate: true });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/settings', data)
            .then(() => router.refresh())
            .catch(() => toast.error('Что-то пошло не так!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Сохранено');
            });

    };

    return (
        <div
        className="
        py-24
        px-8
        "
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Профиль
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Редактор профиля.
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                disabled={isLoading}
                                label="Имя"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Фото
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image
                                        width={48}
                                        height={48}
                                        className="rounded-xl"
                                        src={image || currentUser?.image || 'https://i.pinimg.com/originals/b7/5b/29/b75b29441bbd967deda4365441497221.png'}
                                        alt="Avatar"
                                    />
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onSuccess={handleUpload}
                                        uploadPreset="yfevgpkf"
                                    >
                                        <div className="inline-block">
                                            <div
                                                className="button-wrapper" // Add a class if needed for styling
                                                onClick={() => {
                                                    if (!isLoading) {
                                                        // Trigger file upload manually if needed
                                                    }
                                                }}
                                            >
                                                Изменить
                                            </div>
                                        </div>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            Сохранить
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Settings;
