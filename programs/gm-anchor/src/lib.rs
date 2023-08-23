use anchor_lang::prelude::*;

declare_id!("BTM5fZcVGeTgZ8skRPsFm5hWQCRhaaQNub7TEedz8pfZ");

#[program]
pub mod gm_anchor {
    use super::*;

    pub fn execute(ctx: Context<Execute>, name: String) -> Result<()> {
        let gm_account = &mut ctx.accounts.gm_account;
        gm_account.name = name;
        msg!("Good morning {}", gm_account.name);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Execute<'info> {
    #[account(init, payer = user, space = 8 *32)]
    pub gm_account: Account<'info, GreetingAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct GreetingAccount{
    pub name: String,
}
