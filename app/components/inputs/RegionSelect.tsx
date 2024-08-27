"use client";
import React from 'react';
import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import clsx from "clsx";

interface RegionSelectProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
    required?: boolean;
    id: string;
}

const RegionSelect: React.FC<RegionSelectProps> = ({ register, errors, disabled, required, id }) => {
    const errorMessage = errors.region?.message as string | undefined;

    return (
        <div>
            <label
                className="
                block
                text-sm
                font-medium
                leading-6
                text-gray-900
                "
                htmlFor="region"
            >
                Region
            </label>
            <div className="mt-2">
                <select
                    id="region"
                    {...register(id, {required})}
                    disabled={disabled}
                    className={clsx(`
                      form-select
                      block
                      w-full
                      rounded-md
                      border-0
                      py-1.5
                      text-gray-900
                      shadow-sm
                      ring-1
                      ring-gray-300
                      placeholder:text-gray-400
                      focus:ring-2
                      focus:ring-inset
                      focus:ring-orange-600
                      sm:text-sm
                      sm:leading-6`,
                        errors.region && "ring-rose-500",
                        disabled && "opacity-50 cursor-default"
                    )}
                >
                    <option value="" disabled>Выберите ваш регион</option>
                    <option value="Новосибирск">Новосибирск</option>
                    <option value="Санкт-Петербург">Санкт-Петербург</option>

                </select>
                {errorMessage && (
                    <p className="mt-2 text-sm text-rose-500">
                        {errorMessage}
                    </p>
                )}
            </div>
        </div>
    );
}

export default RegionSelect;