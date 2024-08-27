"use client";

import useActiveChannels from "@/app/hooks/useActiveChannels";

const ActiveStatus = () => {
    useActiveChannels();
    return null;
};

export default ActiveStatus;