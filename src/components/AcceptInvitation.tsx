import React from 'react';
import { acceptInvitation } from '../utils/metamask';

const AcceptInvitation: React.FC = () => {
    const handleAccept = async () => {
        await acceptInvitation();
    };

    return (
        <div>
            <h2>Accept Invitation</h2>
            <button onClick={handleAccept}>Accept</button>
        </div>
    );
};

export default AcceptInvitation;