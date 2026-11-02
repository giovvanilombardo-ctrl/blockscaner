export type CoinSection = { id: string; title: string; body: string[] };
export type CoinContent = {
  id: string; sym: string; name: string;
  heroImage?: string;
  title: string; lead: string;
  sections: CoinSection[];
  whitepaper?: string;
  links?: { label: string; url: string }[];
};

export const BITCOIN: CoinContent = {
  id: "bitcoin", sym: "BTC", name: "Bitcoin",
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

export const ETHEREUM: CoinContent = {
  id: "ethereum", sym: "ETH", name: "Ethereum",
  title: "Buy Ethereum (ETH): value and price trends",
  lead: "Find out what Ethereum (ETH) is, the network that brought smart contracts to crypto: how it works, who develops it, what ether is used for and what to consider before buying.",
  whitepaper: "https://ethereum.org/en/whitepaper/",
  sections: [
    { id: "what", title: "What is Ethereum (ETH)", body: [
      "Ethereum is a blockchain network proposed by Vitalik Buterin at the end of 2013 and launched on 30 July 2015. Where Bitcoin was designed to move one asset, Ethereum was designed to run programmes: smart contracts, code that executes exactly as written, without anyone being able to censor or alter it once published. On top of this idea an entire ecosystem has been built: stablecoins, decentralised finance protocols, tokenised assets, games and digital identity systems.",
      "Ether (ETH) is the network's native asset. It pays for the use of the network — every operation consumes \"gas\" priced in ETH — and it secures the network through staking. Unlike Bitcoin, ether has no fixed maximum supply: new issuance rewards validators, while a portion of every fee is permanently burned, so in periods of high activity the total supply can even shrink.",
      "On Blockscaner you can buy and sell Ethereum on a spot basis, including fractional amounts.",
    ]},
    { id: "governance", title: "Who develops Ethereum and who governs it", body: [
      "No one owns Ethereum. Development is coordinated in the open: anyone can propose a change through an Ethereum Improvement Proposal (EIP), which is discussed publicly by the community of client developers, researchers and users before being included in a network upgrade. The Ethereum Foundation, a Swiss non-profit, funds research and coordination but does not control the network.",
      "Upgrades arrive through coordinated hard forks roughly once or twice a year. The most important was The Merge of September 2022, which replaced energy-intensive mining with proof of stake and cut the network's energy consumption by over 99%. Later upgrades introduced improvements for validators and lower fees for layer-2 networks.",
    ]},
    { id: "network", title: "How the network works", body: [
      "Since The Merge, Ethereum is secured by validators instead of miners. A validator locks 32 ETH as a stake and proposes and attests to new blocks; dishonest behaviour is punished by losing part of the stake (slashing). Those who hold less can participate through staking pools or liquid staking services, receiving a yield that has historically oscillated around 3-4% per year in ETH.",
      "Because block space on the main network is limited and fees rise in busy periods, most everyday activity has moved to layer-2 networks — systems such as Arbitrum, Optimism and Base that process transactions cheaply off-chain and then anchor them to Ethereum. Fees paid on the main network are split: a base fee is burned, reducing the ETH supply, and a tip goes to the validators.",
    ]},
    { id: "holders", title: "Who holds Ethereum today: ETFs, companies, funds", body: [
      "After Bitcoin, ether is the crypto-asset with the broadest institutional presence. Spot Ethereum ETFs have traded in the United States since July 2024, giving funds and advisors regulated access to ETH, and several issuers have since added or requested staking within those products. Listed companies have also begun holding ether as a treasury asset, attracted by the additional staking yield that Bitcoin does not offer.",
      "A significant share of the supply is locked in staking — over a quarter of all ether — which reduces the amount freely traded on the market. The rest is held by individuals, funds, decentralised finance protocols (as collateral) and the treasuries of projects built on the network.",
    ]},
    { id: "cycle", title: "The 2024-2026 cycle", body: [
      "Ether's price history follows Bitcoin's cycles with its own rhythm. In 2021 ETH reached an all-time high close to 4,900 dollars, then lost over 80% in the 2022 bear market. The 2024-2026 cycle was driven first by the approval of spot ETFs in the United States and then by the growth of layer-2 networks and the return of decentralised finance volumes, with ether recovering strongly before correcting together with the whole market.",
      "As with Bitcoin, past cycles say nothing certain about the next one. Ether has historically been more volatile than bitcoin in both directions: it tends to fall harder in corrections and to rise faster in expansions, a profile often described as a higher-beta version of the crypto market.",
    ]},
    { id: "use", title: "What ETH is for", body: [
      "Ether has four main uses. The first is paying for the network: every transfer, trade or contract execution on Ethereum consumes gas paid in ETH. The second is staking: locking ETH to secure the network in exchange for a yield. The third is collateral: ETH is the most used collateral in decentralised finance, behind loans, stablecoins and derivatives. The fourth is settlement: the largest stablecoins and a growing share of tokenised funds and bonds move on Ethereum, and ETH is the asset that guarantees their activity.",
      "Unlike Bitcoin, ether can therefore generate a native yield through staking — but staking is not risk-free: the rewards vary, validators can be penalised for misbehaviour or downtime, and third-party staking services add their own counterparty risk.",
    ]},
    { id: "consider", title: "What to consider before buying ETH", body: [
      "Beyond volatility — historically high even by crypto standards — there are three specific elements. The first is technical: Ethereum evolves through frequent upgrades, and each one carries execution risk, even though none has ever halted the network. The second is competitive: other smart-contract networks compete for the same users and liquidity, and the value of ETH depends on Ethereum keeping its central role. The third is regulatory: the treatment of staking yields and of tokens issued on Ethereum varies from country to country and continues to evolve.",
      "If you transfer ETH or tokens to an external wallet, always check the supported destination network in the app: the same asset can exist on the main network and on several layer-2s, and sending to the wrong network can result in the permanent loss of funds.",
    ]},
    { id: "summary", title: "In summary", body: [
      "Ethereum is the network that turned a blockchain into a platform: smart contracts, proof of stake since 2022, fees that are burned, and an ecosystem of stablecoins, decentralised finance and layer-2 networks that settles the largest share of on-chain economic activity. Ether pays for that activity, secures it through staking and captures its value. For the asset where everything started, see the Bitcoin page.",
    ]},
  ],
};

export const COINS: Record<string, CoinContent> = { bitcoin: BITCOIN, ethereum: ETHEREUM };

/* ---------------- Generic detail pages for other major coins ---------------- */

type GenericInfo = { sym: string; name: string; about: string[]; works: string; use: string };

const KNOWN: Record<string, GenericInfo> = {
  tether: { sym: "USDT", name: "Tether", about: [
      "Tether (USDT) is a stablecoin: a token designed to keep a value as close as possible to one US dollar. It is issued by Tether Limited, which states that every token is backed by reserves composed mainly of US Treasury bills and other liquid assets, and publishes periodic attestations of those reserves.",
      "USDT exists on several blockchains — Ethereum, Tron, Solana and others — and is the most traded crypto-asset in the world by daily volume, because it serves as the dollar of the crypto market: traders park value in it without leaving the ecosystem.",
    ],
    works: "USDT is not mined and has no network of its own: it is a token issued and redeemed by a single company. New tokens are created when clients deposit dollars with the issuer and destroyed when they redeem them. Its price stability therefore depends on the reserves and on confidence in the issuer, not on an algorithm.",
    use: "USDT is used to move dollar value between platforms in minutes, to trade crypto pairs that have no direct euro market, and in some countries as a practical substitute for the dollar for savings and remittances." },
  "usd-coin": { sym: "USDC", name: "USD Coin", about: [
      "USD Coin (USDC) is a stablecoin pegged one-to-one to the US dollar, issued by Circle, a US-regulated financial technology company. Reserves are held in cash and short-dated US Treasuries at regulated financial institutions, with monthly attestations by an independent auditor.",
      "It is the second-largest stablecoin and the one most used by institutions, fintech applications and payment services thanks to its regulatory profile.",
    ],
    works: "Like USDT, USDC is issued and redeemed by a central company against dollar deposits, and circulates as a token on many blockchains. It is not mined and its supply grows and shrinks with demand for dollars on-chain.",
    use: "USDC is used for trading, international payments and as the settlement asset of many decentralised finance protocols and tokenised funds." },
  solana: { sym: "SOL", name: "Solana", about: [
      "Solana is a high-performance blockchain launched in 2020, designed to process thousands of transactions per second with fees of a fraction of a cent, without relying on layer-2 networks. SOL is its native asset: it pays transaction fees and secures the network through staking.",
      "Its speed has made it the reference network for consumer applications, payments, memecoin trading and decentralised exchanges with an order-book feel close to a centralised platform.",
    ],
    works: "Solana combines proof of stake with an innovation called proof of history, a cryptographic clock that lets validators agree on the order of transactions without waiting for each other. This design delivers speed at the cost of higher hardware requirements for validators, and the network has suffered a small number of outages in its history, each later resolved by upgrades.",
    use: "SOL pays for every operation on the network, can be staked for a yield, and is the base asset of Solana's trading and consumer ecosystem." },
  binancecoin: { sym: "BNB", name: "BNB", about: [
      "BNB is the native asset of the BNB Chain ecosystem, originally launched by the Binance exchange in 2017. It began as a token giving fee discounts on the exchange and today powers an entire blockchain used for trading, lending and consumer applications, especially in Asia.",
      "Its supply decreases over time through automatic burns, a mechanism that destroys a portion of tokens every quarter until half of the original supply remains.",
    ],
    works: "BNB Chain is secured by a limited set of validators through a proof-of-staked-authority consensus, which favours speed and low fees over a wide distribution of validators. This makes it fast and cheap, but more dependent on a small group of operators than networks like Bitcoin or Ethereum.",
    use: "BNB pays transaction fees on BNB Chain, is staked to secure the network, and is widely used within the Binance ecosystem for trading-fee discounts and launch programmes." },
  ripple: { sym: "XRP", name: "XRP", about: [
      "XRP is the native asset of the XRP Ledger, one of the oldest blockchains, active since 2012. It was designed for fast, cheap international payments, settling transactions in three to five seconds for a fraction of a cent. The company Ripple builds payment products for banks and financial institutions that can use XRP as a bridge currency.",
      "The entire supply of 100 billion XRP was created at launch; a large share is held in escrow by Ripple and released on a fixed schedule.",
    ],
    works: "The XRP Ledger does not use mining or staking: validators reach agreement through a consensus protocol in which each validator trusts a list of other validators. This makes it fast and energy-efficient, with a decentralisation model based on the diversity of those trust lists.",
    use: "XRP is used to pay network fees, as a bridge between currencies in cross-border payments, and as a reserve asset on the ledger's built-in decentralised exchange." },
  cardano: { sym: "ADA", name: "Cardano", about: [
      "Cardano is a proof-of-stake blockchain launched in 2017, developed with an academic, peer-reviewed approach: every major component is first specified in research papers and then implemented. ADA is its native asset, used for fees and staking.",
      "Its development is led by three entities — IOG, the Cardano Foundation and EMURGO — while decisions increasingly pass to community governance.",
    ],
    works: "Cardano is secured by the Ouroboros proof-of-stake protocol: ADA holders delegate their coins to stake pools, which produce blocks, and both pools and delegators earn rewards. Staking never locks funds: delegated ADA always remains spendable.",
    use: "ADA pays for transactions and smart contracts on Cardano and earns a staking yield for those who delegate it, typically a few percent per year." },
  dogecoin: { sym: "DOGE", name: "Dogecoin", about: [
      "Dogecoin was created in 2013 as a joke, a fork of Bitcoin's code decorated with the Shiba Inu dog of the \"doge\" meme. Against all expectations it built one of the most durable communities in crypto and remains among the largest crypto-assets by market value.",
      "It has no maximum supply: around 5 billion new DOGE are created every year, a fixed amount that becomes proportionally smaller relative to the total supply over time.",
    ],
    works: "Dogecoin works like Bitcoin, with proof-of-work mining — today merged with Litecoin's mining — and blocks every minute. It has no smart contracts and a deliberately simple design; its value rests on its community, brand and liquidity.",
    use: "DOGE is used for tips, small payments and speculation. It is historically one of the most volatile large crypto-assets, strongly influenced by social media trends and public figures." },
  tron: { sym: "TRX", name: "TRON", about: [
      "TRON is a blockchain launched in 2017 focused on cheap, fast transfers and digital content. Its largest real-world use is moving stablecoins: a major share of all USDT in circulation travels on TRON because fees are near zero and confirmations take seconds.",
      "TRX is the native asset, used to pay for network resources and to vote for the delegates who produce blocks.",
    ],
    works: "TRON uses delegated proof of stake: TRX holders vote for 27 \"super representatives\" who produce blocks and share rewards with voters. Transactions consume bandwidth and energy, resources obtained by holding or freezing TRX, which keeps fees minimal for regular users.",
    use: "TRX powers stablecoin transfers, on-chain applications in its ecosystem, and staking through voting for block producers." },
  litecoin: { sym: "LTC", name: "Litecoin", about: [
      "Litecoin is one of the oldest cryptocurrencies, created in 2011 by Charlie Lee as a lighter version of Bitcoin: blocks four times faster, a supply four times larger (84 million), and a mining algorithm designed for ordinary hardware. It has processed payments continuously for well over a decade.",
      "It is often called the digital silver to Bitcoin's digital gold, and it has historically served as a testing ground — technologies such as SegWit ran on Litecoin before Bitcoin.",
    ],
    works: "Litecoin works essentially like Bitcoin: proof-of-work mining, a halving of the block reward roughly every four years, and a fixed maximum supply. Blocks arrive every two and a half minutes, so payments confirm faster than on Bitcoin.",
    use: "LTC is used mainly for payments and transfers: it is accepted by a wide range of merchants and payment processors thanks to its long history and low fees." },
  "bitcoin-cash": { sym: "BCH", name: "Bitcoin Cash", about: [
      "Bitcoin Cash was born on 1 August 2017 from a split (hard fork) of Bitcoin, after a years-long debate on how to scale the network. Its supporters chose bigger blocks to keep fees low and payments fast, instead of Bitcoin's choice of second-layer solutions.",
      "It shares Bitcoin's rules in everything else: 21 million maximum supply, proof of work, and a halving every four years.",
    ],
    works: "BCH works like Bitcoin, with blocks that can contain many more transactions. Its network is secured by a smaller share of global mining power than Bitcoin's, which historically has meant lower security per transaction.",
    use: "BCH is used for everyday payments where supported, positioning itself as electronic cash rather than a store of value." },
  chainlink: { sym: "LINK", name: "Chainlink", about: [
      "Chainlink is not a blockchain but a decentralised oracle network: it brings real-world data — prices, rates, weather, sports results — onto blockchains, where smart contracts can use it. Most major lending and derivatives protocols depend on Chainlink price feeds to function.",
      "LINK is its token, used to pay node operators for data and services, and increasingly staked to secure the network.",
    ],
    works: "Independent node operators fetch data from multiple sources, aggregate it on-chain, and are paid in LINK. Staking lets token holders back the quality of the data: nodes that deliver bad data lose rewards.",
    use: "LINK pays for oracle services across many blockchains and is staked to help secure the data that decentralised finance relies on." },
  polkadot: { sym: "DOT", name: "Polkadot", about: [
      "Polkadot is a network of connected blockchains launched in 2020 by Gavin Wood, co-founder of Ethereum. Its central relay chain coordinates security, while specialised parallel chains (parachains) handle applications, all able to exchange messages natively.",
      "DOT is its native asset, used for staking, governance and securing the network.",
    ],
    works: "Polkadot uses nominated proof of stake: DOT holders nominate validators who secure the relay chain and, through it, every connected parachain. Staking yields have historically been among the highest of major networks, in exchange for an unbonding period when unstaking.",
    use: "DOT is staked to secure the whole ecosystem, used to vote on protocol decisions, and serves as the reserve asset connecting its parachains." },
  "avalanche-2": { sym: "AVAX", name: "Avalanche", about: [
      "Avalanche is a smart-contract platform launched in 2020, known for fast finality — transactions become irreversible in about a second — and for its subnets: custom blockchains that institutions and games can launch while remaining connected to the main network.",
      "AVAX is the native asset: it pays fees (which are burned), secures the network through staking and serves as the base unit across subnets.",
    ],
    works: "Avalanche introduced its own consensus family: validators repeatedly sample each other's opinions until the whole network converges, achieving speed with low energy use. All fees are burned, so heavy usage reduces the AVAX supply.",
    use: "AVAX pays for transactions, is staked for a yield, and is required to launch and secure subnets." },
};

export function genericCoin(id: string): CoinContent | undefined {
  const k = KNOWN[id];
  if (!k) return undefined;
  return {
    id, sym: k.sym, name: k.name,
    title: `Buy ${k.name} (${k.sym}): value and price trends`,
    lead: `Find out what ${k.name} (${k.sym}) is: how it works, what it is used for and what to consider before buying on Blockscaner.`,
    sections: [
      { id: "what", title: `What is ${k.name} (${k.sym})`, body: k.about },
      { id: "how", title: "How the network works", body: [k.works] },
      { id: "use", title: `What ${k.sym} is for`, body: [k.use] },
      { id: "consider", title: `What to consider before buying ${k.sym}`, body: [
        `${k.sym} is a volatile asset: its price can move by double-digit percentages in a single day, and crypto-assets involve a significant risk of losing up to the entirety of the capital invested. Never invest money you cannot afford to lose.`,
        "If you transfer to an external wallet, always check the supported destination network in the app: sending on the wrong blockchain can result in the permanent loss of funds.",
      ]},
      { id: "summary", title: "In summary", body: [
        `${k.name} (${k.sym}) in brief: ${k.use} On Blockscaner you can buy and sell it on a spot basis, including fractional amounts, starting from €20.`,
      ]},
    ],
  };
}

/* ---------------- Dynamic pages for every other listed coin ---------------- */

const RISK_BODY = (sym: string) => [
  `${sym} is a volatile asset: its price can move by double-digit percentages in a single day, and crypto-assets involve a significant risk of losing up to the entirety of the capital invested. Never invest money you cannot afford to lose.`,
  "If you transfer to an external wallet, always check the supported destination network in the app: sending on the wrong blockchain can result in the permanent loss of funds.",
];

const SUMMARY_BODY = (name: string) => [
  `On Blockscaner you can buy and sell ${name} on a spot basis, including fractional amounts, starting from €20. Check the live market data on this page before making any decision, and visit the Academy to learn more about how crypto-assets work.`,
];

function htmlToText(h: string): string {
  return h
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ");
}

/** Build a full detail page from the backend's /api/market/info profile. */
export function coinFromInfo(info: any, marketRow?: any): CoinContent {
  const name = info.name || marketRow?.name || info.id;
  const sym = String(info.symbol || marketRow?.symbol || "").toUpperCase();
  const paras = htmlToText(info.description || "")
    .split(/\r?\n+/)
    .map((s: string) => s.replace(/\s+/g, " ").trim())
    .filter((s: string) => s.length > 60)
    .slice(0, 6);
  const sections: CoinSection[] = [];
  sections.push({
    id: "what", title: `What is ${name} (${sym})`,
    body: paras.length ? paras : [
      `${name} (${sym}) is a crypto-asset listed on Blockscaner. This page shows its live market data, key facts and useful links.`,
    ],
  });
  const facts: string[] = [];
  if (info.genesis_date) facts.push(`${name} was launched on ${info.genesis_date}.`);
  if (info.categories?.length) facts.push(`Sector: ${info.categories.slice(0, 3).join(", ")}.`);
  if (facts.length) sections.push({ id: "facts", title: "Key facts", body: facts });
  sections.push({ id: "consider", title: `What to consider before buying ${sym}`, body: RISK_BODY(sym) });
  sections.push({ id: "summary", title: "In summary", body: SUMMARY_BODY(name) });
  const links: { label: string; url: string }[] = [];
  if (info.homepage?.[0]) links.push({ label: "Official website", url: info.homepage[0] });
  if (info.explorer?.[0]) links.push({ label: "Block explorer", url: info.explorer[0] });
  return {
    id: info.id, sym, name,
    title: `Buy ${name} (${sym}): value and price trends`,
    lead: `Find out what ${name} (${sym}) is: live price, market data and what to consider before buying on Blockscaner.`,
    whitepaper: info.whitepaper || undefined,
    links: links.length ? links : undefined,
    sections,
  };
}

/** Minimal fallback page built only from a markets-table row (when the
 *  profile endpoint is unavailable but the coin is listed). */
export function coinFromMarket(row: any): CoinContent {
  const name = row.name || row.id;
  const sym = String(row.symbol || "").toUpperCase();
  return {
    id: row.id, sym, name,
    title: `Buy ${name} (${sym}): value and price trends`,
    lead: `Live price, market data and what to consider before buying ${name} (${sym}) on Blockscaner.`,
    sections: [
      { id: "what", title: `What is ${name} (${sym})`, body: [
        `${name} (${sym}) is a crypto-asset listed on Blockscaner. This page shows its live market data below; descriptive content is temporarily unavailable.`,
      ]},
      { id: "consider", title: `What to consider before buying ${sym}`, body: RISK_BODY(sym) },
      { id: "summary", title: "In summary", body: SUMMARY_BODY(name) },
    ],
  };
}
