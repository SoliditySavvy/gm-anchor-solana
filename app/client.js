const anchor = require("@project-serum/anchor");
const provider = anchor.AnchorProvider.env();

async function main() {
    // Read the generated IDL.
    const idl = JSON.parse(
        require("fs").readFileSync("../target/idl/gm_anchor.json", "utf8")
    );

    // Address of the deployed program.
    const programId = new anchor.web3.PublicKey("BTM5fZcVGeTgZ8skRPsFm5hWQCRhaaQNub7TEedz8pfZ");

    // Generate the program client from IDL. 
    const program = new anchor.Program(idl, programId);

    // Generate new account address to parse
    const gmAccount = anchor.web3.Keypair.generate();
    const name = "Kyle";

    // Execute the RPC.
    let tx = await program.rpc.execute(name, {
        accounts: {
            gmAccount: gmAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId
        },
        options: { commitment: "confirmed"},
        signers: [gmAccount]
    });

    const storedName = await program.account.greetingAccount.fetch(gmAccount.publicKey);
    console.log(storedName.name);
}

main().then(() => console.log("done"));
