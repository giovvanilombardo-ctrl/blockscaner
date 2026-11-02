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
  "usd-coin": { sym: "USDC", name: "USD Coin", about: [
      "USD Coin (USDC) is a stablecoin pegged one-to-one to the US dollar, issued by Circle, a US-regulated financial technology company. Reserves are held in cash and short-dated US Treasuries at regulated financial institutions, with monthly attestations by an independent auditor.",
      "It is the second-largest stablecoin and the one most used by institutions, fintech applications and payment services thanks to its regulatory profile.",
    ],
    works: "Like USDT, USDC is issued and redeemed by a central company against dollar deposits, and circulates as a token on many blockchains. It is not mined and its supply grows and shrinks with demand for dollars on-chain.",
    use: "USDC is used for trading, international payments and as the settlement asset of many decentralised finance protocols and tokenised funds." },
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

/* ---------------- Full long-form pages for major coins ---------------- */

export const SOLANA: CoinContent = {
  id: "solana", sym: "SOL", name: "Solana",
  title: "Buy Solana (SOL): value and price trends",
  lead: "Find out what Solana (SOL) is, the high-speed blockchain for consumer apps and trading: how it works, who develops it, what SOL is used for and what to consider before buying.",
  whitepaper: "https://solana.com/solana-whitepaper.pdf",
  sections: [
    { id: "what", title: "What is Solana (SOL)", body: [
      "Solana is a blockchain network founded by Anatoly Yakovenko, a former Qualcomm engineer, and launched in March 2020. Its design goal is simple to state: offer the speed and cost of a centralised service while staying a public, permissionless network. Where Ethereum scales through layer-2 networks, Solana scales on its single main chain, processing thousands of transactions per second with fees that are normally a fraction of a cent.",
      "SOL is the network's native asset. It pays for every transaction and smart-contract execution, and it secures the network through staking. Part of every fee is burned, and new issuance decreases on a fixed schedule toward a long-term rate of 1.5% per year.",
      "On Blockscaner you can buy and sell Solana on a spot basis, including fractional amounts.",
    ]},
    { id: "governance", title: "Who develops Solana and who governs it", body: [
      "Solana is not run by a company. Core development is coordinated in the open around the Solana Foundation, a Swiss non-profit, and a growing set of independent teams: Anza maintains the original client, while Jump Crypto builds Firedancer, a completely independent second client written in C that has progressively rolled out since 2024. Two independent clients make the network far more resilient to bugs in any single implementation.",
      "Changes are proposed and discussed publicly through Solana Improvement Documents (SIMDs) and activated by validator vote. The Foundation funds grants, delegations to smaller validators and research, but it does not control the validators that run the network.",
    ]},
    { id: "network", title: "How the network works", body: [
      "Solana's key innovation is proof of history: a cryptographic clock that stamps the order of transactions before they are processed, letting validators work in parallel instead of waiting for each other. On top of it runs a proof-of-stake consensus (Tower BFT): validators lock SOL, produce blocks in rapid turns and vote on the chain's state, with misbehaviour punished by losing part of the stake.",
      "Transactions execute in parallel wherever they do not touch the same accounts, which is why the network sustains thousands of operations per second in practice. The price of this design is demanding hardware for validators, and in its early years the network suffered several outages; none has recurred since the engineering overhauls and the arrival of the second client, but the episode history remains part of the network's risk profile.",
    ]},
    { id: "holders", title: "Who holds Solana today: funds, companies, treasuries", body: [
      "Institutional access widened sharply in 2025, when the first spot Solana ETFs with staking began trading in the United States, giving funds and advisors a regulated channel to SOL. Alongside them, listed companies have built Solana treasury strategies, attracted by the staking yield on top of price exposure.",
      "A large share of the supply is staked — historically well over half — which concentrates economic power among validators and large holders more than in proof-of-work networks. The Solana Foundation also runs a delegation programme that spreads stake toward smaller validators to counter that concentration.",
    ]},
    { id: "cycle", title: "The 2024-2026 cycle", body: [
      "No major crypto-asset has lived a more extreme cycle than SOL. After reaching an all-time high near 260 dollars in November 2021, it lost over 95% in the 2022 collapse, hitting around 8 dollars when the failure of FTX — its most visible backer — made many write the network off. The recovery that followed was among the strongest in the sector: by January 2025 SOL set a new all-time high close to 295 dollars, driven by memecoin trading, consumer apps and DePIN projects choosing Solana for its throughput.",
      "The lesson cuts both ways: the same asset that can lose 95% can multiply from the lows, and neither direction says anything certain about the next cycle. Solana's volatility is high even by crypto standards.",
    ]},
    { id: "use", title: "What SOL is for", body: [
      "SOL has four main uses. The first is paying for the network: every transfer, trade or application interaction costs a fee paid in SOL. The second is staking: locking SOL with validators secures the network in exchange for a yield that has historically been in the 6-8% annual range, before inflation effects. The third is collateral and base currency of Solana's ecosystem: decentralised exchanges, lending protocols, stablecoins and consumer apps settle in SOL. The fourth is the growing DePIN sector — networks for wireless coverage, mapping and computing that run their incentives on Solana.",
      "Solana also became the reference chain for high-frequency retail trading and token launches, which makes demand for SOL sensitive to the very cycles of speculation it hosts.",
    ]},
    { id: "consider", title: "What to consider before buying SOL", body: [
      "Beyond volatility, there are three specific elements. The first is technical history: the network suffered outages in 2021-2023, and although the engineering has matured and a second client now exists, the design pushes hardware harder than rivals. The second is concentration: a large share of stake sits with a relatively small set of validators and early holders. The third is cyclical demand: a significant part of Solana's activity is speculative trading, which can contract quickly and take fee demand with it.",
      "If you transfer SOL to an external wallet, always check the supported destination network in the app: sending on the wrong blockchain can result in the permanent loss of funds.",
    ]},
    { id: "summary", title: "In summary", body: [
      "Solana is the blockchain that bet on raw speed on a single chain: thousands of transactions per second, near-zero fees, two independent clients and a consumer ecosystem that no rival matches for daily activity. SOL pays for that activity and secures it through staking. Its history includes both a 95% collapse and a full recovery to new highs — a fair summary of the risk and the appeal in one line. For the platform where smart contracts began, see the Ethereum page.",
    ]},
  ],
};

export const XRP: CoinContent = {
  id: "ripple", sym: "XRP", name: "XRP",
  title: "Buy XRP (XRP): value and price trends",
  lead: "Find out what XRP is, the digital asset built for fast international payments: how the XRP Ledger works, who holds XRP today, and what to consider before buying.",
  whitepaper: "https://ripple.com/files/ripple_consensus_whitepaper.pdf",
  sections: [
    { id: "what", title: "What is XRP (XRP)", body: [
      "XRP is the native asset of the XRP Ledger, one of the oldest public blockchains, launched in 2012 — three years before Ethereum. It was designed for one purpose: moving value across borders in seconds for a fraction of a cent, as a bridge between currencies that do not have a direct market between them.",
      "The company Ripple builds payment products for banks, fintechs and payment providers that can use XRP for on-demand liquidity, but the ledger itself is open-source and runs independently of the company. The entire supply of 100 billion XRP was created at the ledger's start; no new XRP can ever be issued, and a tiny amount is burned with every transaction.",
      "On Blockscaner you can buy and sell XRP on a spot basis, including fractional amounts.",
    ]},
    { id: "governance", title: "Who develops XRP and who governs it", body: [
      "The XRP Ledger is maintained by an open community: Ripple contributes much of the core engineering, while the XRPL Foundation, an independent non-profit, funds development, validators and standards. Changes to the protocol are adopted when more than 80% of trusted validators support them for two consecutive weeks — a built-in supermajority rule that makes abrupt changes practically impossible.",
      "Ripple the company plays an outsized role in the ecosystem's history: it received 80 billion XRP at inception and today holds most of its remaining share in cryptographic escrow, released on a fixed monthly schedule since 2017. What the company cannot do is change the ledger's rules unilaterally.",
    ]},
    { id: "network", title: "How the network works", body: [
      "The XRP Ledger does not use mining or staking. Instead, validators agree on each new ledger state through a consensus protocol: every validator follows a list of validators it trusts not to collude (its Unique Node List), and a round completes in three to five seconds when those trusted sets overlap enough. The result is fast finality with negligible energy use.",
      "The ledger has built-in features most networks only reach through smart contracts: a native decentralised exchange, issued currencies, and more recently automated market makers, tokenisation tools and an Ethereum-compatible sidechain for full smart contracts.",
    ]},
    { id: "holders", title: "Who holds XRP today: ETFs, Ripple, institutions", body: [
      "The holder structure of XRP is unusual. Ripple's escrow still locks tens of billions of XRP, released up to one billion per month with unused amounts returned — a schedule designed to make supply predictable. Institutional access changed in 2025, when the first spot XRP ETFs launched in the United States after the multi-year SEC case against Ripple ended with a settlement and XRP's legal status in secondary trading clarified.",
      "Ripple has also launched its own US-dollar stablecoin (RLUSD) and acquired prime-brokerage and treasury businesses, positioning XRP within a broader institutional payments stack. Banks and payment companies remain the target users, while retail holders make up most of the free-floating supply.",
    ]},
    { id: "cycle", title: "The 2024-2026 cycle", body: [
      "XRP's price history is inseparable from its regulatory story. It reached an all-time high around 3.84 dollars in January 2018, then spent years suppressed after the US securities regulator sued Ripple in December 2020, causing delistings across American exchanges. The 2023 court ruling that programmatic XRP sales were not securities offerings marked the turning point, and the case's final settlement in 2025 removed the overhang entirely.",
      "The 2024-2026 cycle carried XRP back to multi-year highs above its 2018 peak, fuelled by the settlement, ETF launches and stablecoin expansion. Whether that repricing endures depends on real payment volume growing into the valuation — historically the harder part of the XRP thesis.",
    ]},
    { id: "use", title: "What XRP is for", body: [
      "XRP has three main uses. The first is bridging: a payment from euros to Philippine pesos, for example, can route through XRP in seconds without either side holding a position in the other currency. The second is the ledger's own machinery: transaction fees, account reserves and the native decentralised exchange all require XRP. The third is settlement within Ripple's institutional products, where XRP provides liquidity on demand alongside the company's stablecoin.",
      "What XRP does not do is generate staking yield: there is no mining and no staking, so holdings produce no native return, and services promising one lend your XRP to someone else, with the risks that follow.",
    ]},
    { id: "consider", title: "What to consider before buying XRP", body: [
      "Beyond volatility, there are three specific elements. The first is supply concentration: Ripple's escrow releases up to a billion XRP every month, and the company's sales remain a structural source of supply. The second is adoption risk: the investment case depends on institutions actually using XRP for payments at scale, which has progressed slower than the ledger's technology. The third is history: XRP has spent long stretches 80-90% below its highs, and its rallies have been driven by legal and listing events more than by usage growth.",
      "If you transfer XRP to an external wallet, remember that XRP Ledger accounts require a small reserve and often a destination tag: sending without the correct tag can make funds hard or impossible to recover.",
    ]},
    { id: "summary", title: "In summary", body: [
      "XRP is crypto's payments veteran: a 2012 ledger that settles in seconds for almost nothing, a supply fully issued from day one, and a company building institutional rails around it. The regulatory cloud that hung over it for five years has lifted, ETFs have opened the institutional channel, and the open question is now execution — turning a fast ledger into a payments network that is actually used at scale. For the asset everything started with, see the Bitcoin page.",
    ]},
  ],
};

export const TETHER: CoinContent = {
  id: "tether", sym: "USDT", name: "Tether",
  title: "Buy Tether (USDT): value and price trends",
  lead: "Find out what Tether (USDT) is, the most used stablecoin in the world: how it keeps its one-dollar price, who issues it, what it is used for and what to consider before buying.",
  whitepaper: "https://tether.to/wp-content/uploads/2016/06/TetherWhitePaper.pdf",
  sections: [
    { id: "what", title: "What is Tether (USDT)", body: [
      "Tether (USDT) is a stablecoin: a digital token designed to be worth one US dollar, today and tomorrow. Launched in 2014, it was the first stablecoin and remains the largest, with more than half of the entire stablecoin market. One USDT aims to always buy one dollar, which makes it the base currency of the crypto market: most trading pairs on most exchanges are quoted against USDT.",
      "USDT is not one network but a token issued on many: Ethereum, Tron, Solana and over a dozen other blockchains all carry it, so users can move dollar value wherever fees and speed suit them best.",
      "On Blockscaner you can buy and sell Tether on a spot basis, including fractional amounts.",
    ]},
    { id: "governance", title: "Who issues Tether and who governs it", body: [
      "Unlike Bitcoin or Ethereum, USDT has an owner: Tether Limited, a company that creates and destroys every token. Clients deposit dollars with the issuer and receive USDT; when they redeem, the tokens are burned and the dollars returned. There is no community governance and no protocol to upgrade — the rules are the company's terms of service.",
      "Tether states that every token is backed by reserves held predominantly in US Treasury bills, overnight repos and other liquid assets, and publishes quarterly attestations by an independent accounting firm. The interest earned on those reserves — tens of billions of dollars of Treasuries — is the company's business model, and has made it one of the most profitable companies in the sector per employee.",
    ]},
    { id: "network", title: "How it works", body: [
      "USDT is not mined and has no blockchain of its own. Each token is an entry on a host blockchain — an Ethereum or Tron transaction, for example — while the peg is maintained by the issuer off-chain: authorised participants can always create or redeem USDT at one dollar, so any market deviation above or below a dollar becomes an arbitrage opportunity that pulls the price back.",
      "The same centralisation that makes the peg work also means the issuer can freeze USDT at specific addresses — a power it has used repeatedly in cooperation with law enforcement against scams, sanctions evasion and theft. Hundreds of millions of dollars have been frozen this way.",
    ]},
    { id: "holders", title: "Who holds Tether today", body: [
      "USDT's holder base is unlike any other crypto-asset's. In developed markets it is primarily trading infrastructure: exchanges, market makers and traders parking value between positions without touching the banking system. In emerging markets it is something else entirely — a practical dollar. In countries with inflation, capital controls or weak banking access, from Argentina to Turkey to Nigeria, people hold savings and send remittances in USDT because it is the cheapest dollar available.",
      "This dual nature makes USDT's supply a useful market indicator: growth means new money entering crypto; contraction means dollars leaving.",
    ]},
    { id: "cycle", title: "The 2024-2026 period", body: [
      "A stablecoin has no price cycle in the usual sense — that is precisely its point. What changes is scale and scrutiny. USDT's supply grew through the 2024-2026 period to record levels above one hundred billion dollars as trading volumes recovered and emerging-market adoption deepened, making Tether one of the largest holders of US Treasury bills in the world, ahead of most countries.",
      "The period also brought regulation: Europe's MiCA framework pushed several EU exchanges to restrict or delist USDT in favour of compliant alternatives, while the United States moved toward its first federal stablecoin law. Tether responded with new products and a stated intent to issue a US-regulated token — a sign that the era of the unregulated offshore dollar is closing.",
    ]},
    { id: "use", title: "What USDT is for", body: [
      "USDT has three main uses. The first is trading: it is the counterparty of most crypto trades worldwide, so holding USDT is how most traders wait between positions. The second is transfer: moving dollar value between platforms or across borders in minutes, day and night, for fees that depend on the chosen network. The third is dollar access: for hundreds of millions of people it is the simplest way to hold, receive and send dollars.",
      "What USDT is not is an investment: it is designed to stay at one dollar. It does not appreciate, and services promising yield on USDT are lending your tokens to someone else, with the risks that follow.",
    ]},
    { id: "consider", title: "What to consider before buying USDT", body: [
      "The risks of a stablecoin are different from those of a volatile asset. The first is issuer risk: the peg rests on Tether's reserves and on confidence in its attestations, which are not a full audit. A loss of confidence could break the peg — USDT has briefly traded below one dollar in past stress episodes before recovering. The second is freeze risk: the issuer can and does freeze addresses at the request of authorities. The third is regulatory: access to USDT varies by jurisdiction and has already been restricted on European platforms under MiCA.",
      "When transferring USDT, always check the destination network in the app: the same USDT exists on many blockchains, and sending on the wrong one can result in the permanent loss of funds.",
    ]},
    { id: "summary", title: "In summary", body: [
      "Tether is the dollar of the crypto market: the first stablecoin, the most traded asset in the sector, and for much of the emerging world the most accessible dollar there is. It is issued and frozen by one company, backed by one of the world's largest Treasury portfolios, and increasingly shaped by regulation on both sides of the Atlantic. For a fully reserved, regulated alternative, see the USD Coin page.",
    ]},
  ],
};

export const BNB: CoinContent = {
  id: "binancecoin", sym: "BNB", name: "BNB",
  title: "Buy BNB (BNB): value and price trends",
  lead: "Find out what BNB is, the token at the centre of the Binance ecosystem: how BNB Chain works, why the supply keeps shrinking, and what to consider before buying.",
  whitepaper: "https://github.com/bnb-chain/whitepaper",
  sections: [
    { id: "what", title: "What is BNB (BNB)", body: [
      "BNB was launched in July 2017 as the utility token of Binance, then a brand-new exchange: holding it gave a discount on trading fees. It has since grown into the native asset of an entire blockchain ecosystem — BNB Chain — used for trading, lending, gaming and consumer applications, with some of the highest daily activity of any network.",
      "Two features define the asset. The first is its tie to Binance, the largest crypto exchange in the world, whose products continually route demand through BNB. The second is its shrinking supply: from 200 million tokens at launch, automatic burns destroy BNB every quarter, with the stated goal of reaching 100 million.",
      "On Blockscaner you can buy and sell BNB on a spot basis, including fractional amounts.",
    ]},
    { id: "governance", title: "Who develops BNB and who governs it", body: [
      "BNB Chain is open-source and its development is coordinated through public proposals, but the ecosystem's centre of gravity is Binance: the exchange seeded the chain, funds core development, and remains by far its largest user and influence. Validators are elected by BNB stakers, yet the effective set is small — a design choice that buys speed at the cost of distributed control.",
      "The exchange itself changed leadership in 2023, when its founder stepped down following a settlement with US authorities; the chain continued operating through the transition, which holders read as proof the ecosystem is bigger than one executive.",
    ]},
    { id: "network", title: "How the network works", body: [
      "BNB Smart Chain runs a proof-of-staked-authority consensus: a limited set of elected validators takes turns producing blocks every few seconds, keeping fees low and confirming fast. The trade-off is explicit — fewer validators mean less censorship resistance than networks like Bitcoin or Ethereum.",
      "Around the main chain sits a growing stack: opBNB, a layer-2 for cheaper execution; Greenfield, a decentralised storage network; and the burn mechanism, which destroys a portion of tokens every quarter based on price and activity — a deflationary schedule that no central bank offers.",
    ]},
    { id: "holders", title: "Who holds BNB today", body: [
      "BNB's holder base is anchored to the Binance ecosystem: tens of millions of exchange users hold it for fee discounts, launch-pool allocations and trading, while on-chain holders use it across BNB Chain's applications, which are especially popular in Asia and emerging markets.",
      "Institutional vehicles came later than for Bitcoin or Ethereum: dedicated ETPs and treasury products exist, but BNB's distribution remains closely tied to the exchange and its users — a strength for demand, and the asset's central risk at the same time.",
    ]},
    { id: "cycle", title: "The 2024-2026 cycle", body: [
      "BNB's price history tracks the fortunes of the exchange behind it. From fifteen cents at the 2017 sale it rose above 690 dollars in 2021, then weathered the sector's 2022 collapse and the exchange's 2023 regulatory settlement — an event many expected to be existential, and which instead passed with the token intact.",
      "In the 2024-2026 cycle BNB reached new all-time highs, carried by the recovery of trading volumes, quarterly burns steadily reducing supply, and the expansion of BNB Chain's application layer. The pattern of this asset has been resilience through crises that were specifically about its own ecosystem.",
    ]},
    { id: "use", title: "What BNB is for", body: [
      "BNB has four main uses. The first is fees: every transaction on BNB Chain is paid in BNB. The second is staking: delegating BNB to validators secures the network for a yield. The third is the Binance platform itself: trading-fee discounts, token sales and launch programmes require or reward BNB. The fourth is as base currency of the chain's DeFi and consumer apps.",
      "The burn mechanism adds a fifth dimension: holding BNB is a claim on an asset whose supply is programmed to shrink, funded by the activity of the largest exchange in the sector.",
    ]},
    { id: "consider", title: "What to consider before buying BNB", body: [
      "Beyond volatility, there are three specific elements. The first is single-entity risk: BNB's value is deeply linked to one company — its regulation, its market share and its reputation. The 2023 settlement showed both the risk and the resilience. The second is centralisation: the small validator set makes the chain faster but more dependent on coordinated operators than its larger rivals. The third is jurisdictional: access to Binance products varies widely by country, and changes can shift demand for the token.",
      "If you transfer BNB to an external wallet, always check the supported destination network in the app: BNB exists on more than one network, and sending on the wrong one can result in the permanent loss of funds.",
    ]},
    { id: "summary", title: "In summary", body: [
      "BNB is the token of the largest ecosystem in crypto by users: an exchange token that became a blockchain, with fees, staking, launch programmes and a supply that burns down every quarter. Its strength and its risk are the same — the fortunes of Binance. For a network with no company behind it, see the Ethereum page.",
    ]},
  ],
};

export const CARDANO: CoinContent = {
  id: "cardano", sym: "ADA", name: "Cardano",
  title: "Buy Cardano (ADA): value and price trends",
  lead: "Find out what Cardano (ADA) is, the blockchain built on peer-reviewed research: how its staking works, who develops it, and what to consider before buying.",
  whitepaper: "https://docs.cardano.org/about-cardano/new-to-cardano/",
  sections: [
    { id: "what", title: "What is Cardano (ADA)", body: [
      "Cardano is a proof-of-stake blockchain launched in 2017 by Charles Hoskinson, a co-founder of Ethereum, with a distinctive method: every core component is first specified in academic papers, peer-reviewed, and only then implemented. The result is one of the most formally studied protocols in the sector — and a deliberately slower development pace than rivals.",
      "ADA, named after the nineteenth-century mathematician Ada Lovelace, is the network's native asset. It pays transaction fees, secures the network through staking and gives holders a vote in on-chain governance. The maximum supply is fixed at 45 billion.",
      "On Blockscaner you can buy and sell Cardano on a spot basis, including fractional amounts.",
    ]},
    { id: "governance", title: "Who develops Cardano and who governs it", body: [
      "Development has historically been shared by three organisations: IOG, the engineering company founded by Hoskinson; the Cardano Foundation, which oversees the brand and adoption; and EMURGO, the commercial arm. Since 2024-2025 the network has been transitioning to full community governance: under the Chang upgrades and the CIP-1694 framework, ADA holders delegate votes to representatives (DReps) who decide on protocol changes, treasury spending and the constitution.",
      "Cardano is therefore one of the few networks where token holders directly control a substantial on-chain treasury — hundreds of millions of dollars in ADA funding ecosystem projects by vote.",
    ]},
    { id: "network", title: "How the network works", body: [
      "Cardano is secured by Ouroboros, the first proof-of-stake protocol with peer-reviewed security proofs. ADA holders delegate their coins to stake pools, which produce blocks; rewards — historically around 2-4% per year — flow to both pools and delegators. Crucially, delegation never locks funds: ADA stays spendable at all times, and there is no slashing for delegators.",
      "The ledger uses an extended-UTXO model, closer to Bitcoin's accounting than to Ethereum's accounts, which makes transaction outcomes predictable before they are submitted. Smart contracts (Plutus) arrived in 2021, followed by a layer-2 roadmap (Hydra) and partner chains like Midnight for data-privacy applications.",
    ]},
    { id: "holders", title: "Who holds Cardano today", body: [
      "ADA has one of the most retail-driven holder bases among large crypto-assets, with an unusually loyal community and historically the highest share of supply locked in staking of any major network — often two-thirds or more. It has long been especially popular in Japan, where it was one of the first altcoins listed on regulated exchanges.",
      "Institutional presence is thinner than for BTC, ETH or SOL: regulated ETPs exist in Europe, but no US spot ETF has been approved as of 2026, which keeps ADA's demand primarily retail and staking-driven.",
    ]},
    { id: "cycle", title: "The 2024-2026 cycle", body: [
      "ADA's price history shows the community's patience and its cost. It reached an all-time high around 3.10 dollars in September 2021, ahead of the smart-contract launch, then lost over 90% through the 2022 bear market as on-chain activity grew slower than the valuation had assumed.",
      "The 2024-2026 cycle brought a partial recovery, driven by the governance transition, the growth of the community treasury and the broader market upswing — but ADA remained well below its 2021 peak, reflecting the market's verdict that adoption, not research, is the remaining proof to deliver.",
    ]},
    { id: "use", title: "What ADA is for", body: [
      "ADA has four main uses. The first is fees for transactions and smart contracts. The second is staking: delegation secures the network and earns a yield without locking funds. The third is governance: voting power over the treasury and protocol decisions. The fourth is as the base asset of Cardano's application ecosystem — DeFi protocols, stablecoins, identity and real-world projects in education and agriculture, several of them in African markets.",
      "Cardano's design favours correctness over speed: for holders, that means fewer catastrophic bugs and exploits than faster-moving rivals, at the price of a smaller application economy.",
    ]},
    { id: "consider", title: "What to consider before buying ADA", body: [
      "Beyond volatility, there are three specific elements. The first is adoption: Cardano's on-chain economy — users, applications, locked value — remains smaller than its market value implies, and closing that gap is the core challenge. The second is pace: the research-first method delivers late relative to competitors, and the market has historically punished delay. The third is narrative dependence: ADA's valuation leans heavily on community loyalty and future delivery rather than current usage.",
      "If you transfer ADA to an external wallet, always check the supported destination network in the app: sending on the wrong blockchain can result in the permanent loss of funds.",
    ]},
    { id: "summary", title: "In summary", body: [
      "Cardano is the methodical blockchain: peer-reviewed consensus, staking without lock-ups, on-chain governance with a community treasury, and a decade of development without a major security failure. The open question is whether careful engineering can still catch up with faster-moving rivals in applications and users. For the network that chose speed instead, see the Solana page.",
    ]},
  ],
};

export const DOGECOIN: CoinContent = {
  id: "dogecoin", sym: "DOGE", name: "Dogecoin",
  title: "Buy Dogecoin (DOGE): value and price trends",
  lead: "Find out what Dogecoin (DOGE) is, the original memecoin that refused to die: how it works, why its supply grows forever, and what to consider before buying.",
  sections: [
    { id: "what", title: "What is Dogecoin (DOGE)", body: [
      "Dogecoin was created in December 2013 by two engineers, Billy Markus and Jackson Palmer, as a joke: a copy of Bitcoin's code decorated with the Shiba Inu dog from the \"doge\" meme, launched with no sale, no company and no roadmap. The joke outlived almost every serious project of its era — Dogecoin has been running uninterrupted for over a decade and remains one of the largest crypto-assets by market value.",
      "DOGE has no maximum supply: about 5 billion new coins are created every year through mining. That fixed annual amount becomes proportionally smaller as the total grows — inflation that is perpetual but ever-declining in percentage terms.",
      "On Blockscaner you can buy and sell Dogecoin on a spot basis, including fractional amounts.",
    ]},
    { id: "governance", title: "Who develops Dogecoin and who governs it", body: [
      "Nobody owns Dogecoin. The founders left the project years ago, and development is carried on by a small group of volunteer maintainers, with the Dogecoin Foundation — re-established in 2021 with advisors including Ethereum's Vitalik Buterin — coordinating roadmap and funding. Changes are rare, conservative and adopted through the same miner-and-node process as Bitcoin's.",
      "Dogecoin's most influential figure holds no formal role at all: Elon Musk's posts have moved the price more than any protocol upgrade, a fact that tells you most of what there is to know about this asset's governance.",
    ]},
    { id: "network", title: "How the network works", body: [
      "Dogecoin works essentially like early Bitcoin: proof-of-work mining, a block every minute, and a public ledger anyone can verify. Since 2014 it has been merge-mined with Litecoin, meaning Litecoin miners secure Dogecoin at the same time at no extra cost — the arrangement that gives a meme coin the protection of one of the oldest mining networks.",
      "There are no smart contracts, no staking and no second layer: the design is deliberately simple. Transactions confirm quickly and cost little, which made DOGE a genuine tipping and small-payments currency in its early community years.",
    ]},
    { id: "holders", title: "Who holds Dogecoin today", body: [
      "DOGE's holder base is the broadest kind of retail: millions of small holders who bought the meme, the moment or the community. Ownership is concentrated at the top — a small number of wallets, including exchange cold wallets holding customer balances, control a large share of supply, a structural feature worth knowing before buying.",
      "Institutional acceptance arrived late and thin: DOGE appears in some payment processors and a handful of regulated products, but its demand remains overwhelmingly sentiment-driven rather than utility-driven.",
    ]},
    { id: "cycle", title: "The 2024-2026 cycle", body: [
      "Dogecoin's cycles are the purest expression of crypto sentiment. In early 2021 it rose from half a cent to an all-time high near 74 cents — over 100x in months — on the back of social-media momentum and Musk's television appearances, then lost more than 90%. Every market upswing since has repeated the pattern at smaller scale: DOGE moves first and furthest when retail euphoria returns, and falls hardest when it leaves.",
      "The 2024-2026 cycle brought renewed spikes on political and celebrity news, with DOGE again among the largest assets by value — a reminder that in this market, attention itself is a form of fundamentals.",
    ]},
    { id: "use", title: "What DOGE is for", body: [
      "DOGE has three uses. The first is tipping and small payments: cheap, fast and culturally established, it remains accepted by a scattering of merchants and payment processors. The second is community: holding DOGE is membership in one of crypto's oldest and most good-natured subcultures, which has funded everything from Olympic teams to water wells. The third, dominant in practice, is speculation: DOGE is the market's oldest vehicle for betting on retail sentiment itself.",
      "It has no yield, no burn, no scarcity mechanism and no application ecosystem: its price rests on attention, liquidity and the durability of the joke.",
    ]},
    { id: "consider", title: "What to consider before buying DOGE", body: [
      "Dogecoin concentrates nearly every risk the sector offers. Its price is driven by sentiment and celebrity signals rather than usage; its supply inflates by about 5 billion coins a year with no cap; a small number of wallets holds a large share; and its drawdowns have repeatedly exceeded 90%. It is, by design and by history, among the most speculative large crypto-assets.",
      "Never invest money you cannot afford to lose — a warning that applies to all crypto-assets and doubly to memecoins. If you transfer DOGE to an external wallet, always check the supported destination network in the app: sending on the wrong blockchain can result in the permanent loss of funds.",
    ]},
    { id: "summary", title: "In summary", body: [
      "Dogecoin is the joke that became infrastructure: a 2013 meme with Bitcoin's plumbing, merge-mined security, a minute per block and a community that never left. It offers no scarcity, no yield and no applications — only the strange durability of collective attention, which has carried it through four market cycles. For the asset built on programmed scarcity instead, see the Bitcoin page.",
    ]},
  ],
};

Object.assign(COINS, {
  solana: SOLANA, ripple: XRP, tether: TETHER,
  binancecoin: BNB, cardano: CARDANO, dogecoin: DOGECOIN,
});
