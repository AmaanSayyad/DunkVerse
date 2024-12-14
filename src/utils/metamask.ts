import { ethers } from 'ethers';

// Connect to MetaMask
export async function connectMetaMask() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            return signer;
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        console.error('MetaMask not installed');
    }
}

// Contract address and ABI
const contractAddress = '0xfA224De740979215a51162d27C0Db1621A4712A9';
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_dunkVerseToken",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "invitee",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "InvitationAccepted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "inviter",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "invitee",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "InvitationSent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "acceptInvitation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dunkVerseToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "invitee",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "invite",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "invited",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "tokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Invite a friend
export async function inviteFriend(invitee: string, amount: number) {
    const signer = await connectMetaMask();
    if (signer) {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            await contract.invite(invitee, ethers.utils.parseUnits(amount.toString(), 18));
            console.log(`Invitation sent to ${invitee} for ${amount} tokens`);
        } catch (error: any) {
            if (error.code === ethers.errors.UNPREDICTABLE_GAS_LIMIT) {
                console.error('Transaction may fail or may require manual gas limit:', error);
                if (error.error && error.error.message.includes('Already invited')) {
                    alert('This address has already been invited.');
                } else {
                    alert('An error occurred while sending the invitation.');
                }
            } else if (error.data && error.data.message.includes('Already invited')) {
                alert('This address has already been invited.');
            } else {
                console.error('An unexpected error occurred:', error);
                alert(`An unexpected error occurred: ${error.message}`);
            }
        }
    }
}

// Accept invitation
export async function acceptInvitation() {
    const signer = await connectMetaMask();
    if (signer) {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            await contract.acceptInvitation();
            // Redirect to your application
            window.location.href = 'http://localhost:3000/';
        } catch (error) {
            console.error('An error occurred while accepting the invitation:', error);
			if (error instanceof Error) {
				alert(`An error occurred while accepting the invitation: ${error.message}`);
			} else {
				alert('An unknown error occurred while accepting the invitation.');
			}
        }
    }
}

// Listen to InvitationSent event
export async function listenToInvitationSent() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    contract.on('InvitationSent', (inviter, invitee, amount) => {
        console.log(`Invitation sent from ${inviter} to ${invitee} for ${amount} tokens`);
        alert(`Invitation sent from ${inviter} to ${invitee} for ${amount} tokens`);
    });
}