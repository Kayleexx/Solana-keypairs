const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Create a new keypair
const newPair = new Keypair();

// Extract the public key from the keypair
const publicKey = new PublicKey(newPair.publicKey).toBase58();

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Your Public Key: ", publicKey);

const mainFunction = async () => {
    try {
        // Request airdrop of 2 SOL to your generated public key
        console.log("Airdropping some SOL to your wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(publicKey),
            2 * LAMPORTS_PER_SOL
        );

        await connection.confirmTransaction(fromAirDropSignature);

        await getWalletBalance();
    } catch (err) {
        console.log(err);
    }
};

// Get the wallet balance from your generated public key
const getWalletBalance = async () => {
    try {
        // Get balance of your generated wallet address
        const walletBalance = await connection.getBalance(new PublicKey(publicKey));
        console.log(`Your Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

mainFunction();
