export type CoinSection = { id: string; title: string; body: string[] };
export type CoinContent = {
  id: string; sym: string; name: string;
  heroImage?: string;
  title: string; lead: string;
  sections: CoinSection[];
  whitepaper?: string;
};

export const BITCOIN: CoinContent = {
  id: "bitcoin", sym: "BTC", name: "Bitcoin",
  heroImage: "btc-hero",
  title: "Buy Bitcoin (BTC): value and price trends",
  lead: "Find out what Bitcoin (BTC) is, the first crypto-asset: how the network works, who governs it, who holds it today between ETFs and companies, and what to consider before buying.",
  whitepaper: "https://bitcoin.org/bitcoin.pdf",
  sections: [
    { id: "what", title: "What is Bitcoin (BTC)", body: [
      "Bitcoin is the first crypto-asset and the network that makes it work. It was born on 3 January 2009 from a paper signed Satoshi Nakamoto, an identity that has never been revealed, with an idea simple to state and hard to build: a digital currency that can be transferred between two people without a bank in between, with a public ledger that everyone can verify and no one can change alone.",
      "The total quantity is fixed by the code at 21 million units and cannot be changed without the consent of those who run the network. As of September 2026 around 20 million had been created, over 95% of the total; the last ones will arrive around 2140. This programmed scarcity is why Bitcoin is often compared to gold, and the reason it has become the crypto-asset most held by funds, companies and states.",
      "On Blockscaner you can buy and sell Bitcoin on a spot basis, including fractional amounts.",
    ]},
    { id: "governance", title: "Who develops Bitcoin and who governs it", body: [
      "Nobody. There is no company, foundation or chief executive. The reference software, Bitcoin Core, is maintained by an open group of developers, volunteers or paid by third parties, and every change goes through a public proposal, called a BIP, discussed for months or years. But a proposal becomes a rule only if it is adopted by the nodes, the computers around the world that verify every transaction, and by the miners, who produce the blocks. None of the three groups commands the others: this is why Bitcoin changes slowly.",
      "Upgrades are rare and conservative. The last major one, Taproot, dates from November 2021. In 2026 developers added to the official repository the proposal BIP-360, which defines a new address type resistant to quantum computers: it is the first step of a path that will take years, and for now it is a proposal, not a rule active on the network.",
    ]},
    { id: "network", title: "How the network works", body: [
      "Roughly every ten minutes the network gathers transactions into a block and adds it to the chain. Whoever produces the block, the miner, must solve a computational problem that requires energy and dedicated machines: this is proof of work, and it serves to make rewriting history expensive. In return the miner receives new bitcoin plus transaction fees. The network’s total computing power passed the threshold of 1,000 exahashes per second in 2026, an all-time record, while the difficulty of the problem adjusts every two weeks to keep blocks at ten minutes.",
      "The block reward halves every 210,000 blocks, roughly every four years: this is the halving. The last one, on 20 April 2024, brought it to 3.125 bitcoin; the next is expected in 2028. It is the mechanism that makes Bitcoin ever scarcer over time and that, cycle after cycle, has marked its price history. For everyday payments there is a second-layer network, Lightning, which settles transactions off the main chain and closes them on Bitcoin only at the end.",
    ]},
    { id: "holders", title: "Who holds Bitcoin today: ETFs, companies, states", body: [
      "Since January 2024 spot Bitcoin ETFs have been listed in the United States, and in two and a half years they have changed the holder base. On 3 September 2026 the American funds held around 103 billion dollars in bitcoin under management, just over 6% of market capitalisation. The largest listed company with Bitcoin on its balance sheet, Strategy, held 845,050 as of 7 September 2026, around 4% of all those in existence, bought at an average price of 75,412 dollars.",
      "States have entered the picture too. On 6 March 2025 an executive order by the US president established a Strategic Bitcoin Reserve, funded with coins seized in legal proceedings; bills to buy one million over five years have been introduced in Congress but not passed. Together, funds, companies and states today hold a share of Bitcoin that ten years ago was in the hands of individuals: a change that makes the market deeper and, at the same time, more tied to the decisions of a few large players.",
    ]},
    { id: "cycle", title: "The 2024-2026 cycle", body: [
      "Bitcoin’s price history proceeds in cycles of around four years, tied to the halvings. The latest cycle started from the April 2024 halving and peaked on 6 October 2025, with an all-time high just above 126,000 dollars, driven by ETF inflows and corporate treasury purchases. 2026 has played out below that level: in the first half of the year the price came to lose around half its value from the peak, amid fund outflows and interest rates higher than expected.",
      "It is not the first time. Bitcoin lost over 80% from its peak in 2014, 2018 and 2022, and each time went on to exceed the previous high. This tells the story of the asset’s volatility, not its future: past cycles do not guarantee that the next one will behave the same way.",
    ]},
    { id: "use", title: "What BTC is for", body: [
      "Bitcoin has three main uses. The first is store of value: programmed scarcity and a sixteen-year history without interruptions make it the digital asset most held for the long term, by individuals and institutions. The second is transfer of value: a transaction reaches anywhere in the world in ten minutes, without intermediaries, with fees that depend on network congestion and not on the amount. The third is collateral: Bitcoin is the most used collateral in the sector, both in loans between institutions and in decentralised finance protocols through “wrapped” versions of the token on other networks.",
      "What Bitcoin does not do is generate yield on its own. There is no Bitcoin staking: whoever holds it in a wallet has exactly the quantity they had, and services that promise a yield on Bitcoin do so by lending your bitcoin to someone else, with the risks that follow.",
    ]},
    { id: "consider", title: "What to consider before buying BTC", body: [
      "Beyond volatility, which for Bitcoin is historically higher than that of any traditional asset, there are three specific elements. The first is concentration: ETFs and corporate treasuries together hold over a tenth of the supply, and their flows move the price more than small holders used to. The second is the long run: Bitcoin’s security depends on mining, whose reward halves every cycle, and on current cryptography, which the work on BIP-360 aims to make quantum-resistant before it becomes a concrete threat. The third is regulatory: Bitcoin is today the digital asset most accepted by regulators, but it remains subject to tax and custody rules that vary from country to country.",
      "If you want to transfer Bitcoin to an external wallet, always check the supported destination network in the app: sending on the wrong blockchain can result in the permanent loss of funds.",
    ]},
    { id: "summary", title: "In summary", body: [
      "Bitcoin is the crypto-asset where everything started and the only one without an issuer: 21 million units, a network nobody controls, a four-year cycle marked by halvings. In 2025 it reached its all-time high and in 2026 went through a deep correction, while ETFs, companies and states became its large holders. Understanding how the network works, and who owns it today, is the best way to decide whether and how to add Bitcoin to your crypto-asset portfolio. For the network that opened the way to applications, see the Ethereum page; for the two coins born from Bitcoin, those of Litecoin and Bitcoin Cash.",
    ]},
  ],
};

export const COINS: Record<string, CoinContent> = { bitcoin: BITCOIN };
