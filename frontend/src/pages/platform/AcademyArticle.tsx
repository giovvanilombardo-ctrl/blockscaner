import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* shared banknote artwork — also used by the Academy hero */
export const ArtEthereumNote = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#c9f5dd"/>
    <rect x="46" y="34" width="248" height="142" rx="14" fill="#3ddc84"/>
    <rect x="46" y="34" width="248" height="142" rx="14" fill="none" stroke="#0d0d12" strokeWidth="4"/>
    <rect x="58" y="46" width="224" height="118" rx="8" fill="none" stroke="#0d0d12" strokeWidth="2" opacity=".5"/>
    <path d="M58 60 q14 0 14 -14 M282 60 q-14 0 -14 -14 M58 150 q14 0 14 14 M282 150 q-14 0 -14 14" stroke="#0d0d12" strokeWidth="2.5" fill="none"/>
    <circle cx="120" cy="105" r="44" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
    <path d="M120 74 L138 106 L120 118 L102 106 Z" fill="#0d0d12"/>
    <path d="M120 74 L138 106 L120 100 Z" fill="#0d0d12" opacity=".55"/>
    <circle cx="214" cy="105" r="44" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
    <g fill="none" stroke="#0d0d12" strokeWidth="2.6">
      <path d="M214 84 a21 21 0 0 1 21 21"/><path d="M193 105 a21 21 0 0 1 12 -19"/>
      <path d="M214 93 a12 12 0 0 1 12 12"/><path d="M202 105 a12 12 0 0 1 6 -10"/>
      <path d="M214 101 a4 4 0 0 1 4 4 a4 4 0 0 1 -4 4"/>
      <path d="M226 118 a24 24 0 0 1 -22 10"/><path d="M196 118 a20 20 0 0 1 -6 -13"/>
    </g>
  </svg>
);

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="ac-badge"><i />{children}</span>;
}
function Tag({ children }: { children: React.ReactNode }) {
  return <span className="ac-tag">{children}</span>;
}

const ShareIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18"><path d={d} fill="#0f0f12"/></svg>
);

export default function AcademyArticle() {
  return (
    <SiteLayout>
      <Seo title="The genesis of Ethereum: the story of the ICO — Blockscaner Academy" description="The Ethereum ICO showcased an innovative fundraising model that inspired numerous projects and entrepreneurs." />
      <div className="ac-article" data-testid="academy-article">

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Ethereum</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("The genesis of")}<br />{_t("Ethereum: the story of")}<br />{_t("the ICO")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">October 9, 2026&nbsp;&nbsp;•&nbsp;&nbsp;10 min</p>

        {/* hero image — click opens this article in a new tab */}
        <Link to="/products/academy/ethereum-ico" target="_blank" rel="noopener noreferrer" aria-label="Open this article in a new page" style={{ display: "block" }}>
          <div className="ac-article-thumb">
            <Badge>Beginner</Badge>
            {ArtEthereumNote}
          </div>
        </Link>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#when-did-ethereum-start">{_t("When did Ethereum start?")}</a></li>
            <li><a href="#why-called-ethereum">{_t("Why is the blockchain called Ethereum?")}</a></li>
            <li><a href="#how-ethereum-was-created">{_t("How Ethereum was created: the battle of Crypto Valley")}</a></li>
            <li><a href="#what-are-icos">{_t("What are ICOs: the example of Ethereum")}</a></li>
            <li><a href="#what-is-ethereum">{_t("What is Ethereum: Ether and the ERC-20")}</a></li>
            <li><a href="#success-and-demise">{_t("The success and demise of ICOs")}</a></li>
          </ul>
        </div>

        {/* Article body */}
        <div className="ac-body">
          <p>Ethereum is the blockchain conceived by Vitalik Buterin to overcome Bitcoin‘s scalability limitations. Through smart contracts and decentralised applications (dApps), the Ether coin (ETH) powers decentralised finance (DeFi). The Initial Coin Offering (ICO) of 2014 was pivotal in the protocol’s development, but how did Ethereum come about and what significance did this innovation have?</p>

          <h2 id="when-did-ethereum-start">When did Ethereum start?</h2>
          <p>The first date that might give a clue as to when Ethereum was created is December 2013, when Vitalik Buterin formalised the idea of a blockchain for decentralised applications in the Ethereum whitepaper. We can also recall the creation, in June 2014, of the Ethereum Foundation, or the Initial Coin Offering (ICO) that began on the 20th of July of the same year, as we will see later. However, the real birth of Ethereum might consist in the release of the Frontier version of the network, which went online on the 30th of July 2015, following numerous Proof of Concepts. The creation of the ‘genesis block’, coinciding with Frontier, is perhaps the true date of the foundation of Ethereum.</p>

          <h2 id="why-called-ethereum">Why is the blockchain called Ethereum?</h2>
          <p>In 2014, while Vitalik was consulting a list of science fiction items on Wikipedia, he came across the word Ethereum. He immediately chose it for his project because “it sounded good and had the word ‘ether’ in it“, referring to the hypothetical invisible medium that permeates the universe.</p>
          <p>Luminiferous ether, is the theoretical concept that explained the ability of light waves to propagate through the universe, prior to the discovery of the vacuum. Despite proof of the fact ether does not exist, it stimulated the birth of relativity and quantum physics. The term is also associated with the Aristotelian philosophy of the quintessential ether.</p>
          <p>Now that we have an answer to the question of when and why, all that remains is to find out how Ethereum was created.</p>

          <h2 id="how-ethereum-was-created">How Ethereum was created: the battle of Crypto Valley</h2>
          <p>If you have read the Crypto Hero article about Vitalik Buterin, you already know his version of how Ethereum was born, however it is important to devote a ‘spin-off’ to the Initial Coin Offering (ICO) that determined its success.</p>
          <p>You may already be familiar with the turbulent history of the founders of Ethereum, between euphoria and abandonment, but let us give you a brief summary. In January 2014, after Vitalik presented Ethereum at the Bitcoin Conference in Miami, the original group of 5 founders expanded to 8 members with the addition of, among others, Gavin Wood, the future creator of Polkadot.</p>
          <p>At the same time, the team began to develop the protocol under the name Ethereum Switzerland GmbH (EthSuisse). They registered the company in Switzerland as, at the time, it was the country with the most suitable regulatory environment and most willing to accept ‘revolutionary’ economic projects.</p>
          <p>However, Vitalik Buterin was adamant about the non-profit nature of the organisation: thus, the Ethereum Foundation was created in Zug (Switzerland) in June 2014, causing the dissatisfaction of Charles Hoskinson, who left to create Cardano. The project’s initial backers (Anthony di Iorio and Joseph Lubin) followed Hoskinson, which left Vitalik and the remaining founders without funds. The official website defines the Ethereum Foundation (EF) as “a non-profit organisation committed to supporting Ethereum and related technologies“; it also clarifies that the EF is not a company and that its role is not to control or direct Ethereum. Rather, the Ethereum Foundation is a promoter of the broader Decentralised Finance (DeFi) ecosystem, which it helped to create.</p>
          <p>The divisive event, which earned Zug the nickname ‘Crypto Valley, was important because it popularised a new form of fundraising: the ICO, a hybrid of crowdfunding and Initial Public Offering (IPO).</p>

          <div className="ac-note">
            <h4>IPO (Initial Public Offering)</h4>
            <p>An IPO (Initial Public Offering) is the public sale of the securities of a company that would like to be listed on a regulated market. The objective of an IPO is to enlarge the capital of a company by involving other investors besides the original founders and shareholders.</p>
          </div>

          <h2 id="what-are-icos">What are ICOs: the example of Ethereum</h2>
          <p>ICOs, at least at the time, differed from IPOs in two ways: they did not have to go through the complex regulatory process of public offerings because it was not equity (i.e. shares in a company) but coins or utility tokens that were distributed.</p>
          <p>The latter is a type of token that provides access to the services and benefits provided by a blockchain and its ecosystem, such as the Young token (YNG). However, ICOs have often generated ambiguity about the distinction between utility and security, as we shall see in a bit. For now, we will focus on the importance of the Ethereum ICO, and then discuss the phenomenon that emerged from this inauguration.</p>

          <div className="ac-note">
            <h4>ICO</h4>
            <p>ICO stands for Initial Coin Offering, an initial public offering in the cryptocurrency world. When a project wants to launch its own cryptocurrency, it can launch an ICO to attract investors to its ecosystem.</p>
          </div>

          <p>Ethereum’s ICO, which was only preceded by Mastercoin (later Omni Layer, the first network Tether was issued on) and a few others, opened on the 20th of July 2014 with the sale of 7 million ether (ETH, Ethereum’s coin) in the first 12 hours, totalling about $2.2 million, and closed on the 2nd of September 2014, for a total duration of 42 days.</p>
          <p>The only way to participate was to pay in Bitcoin: for the first 14 days, the exchange rate was set at 1 bitcoin per 2000 ETH, after which this amount decreased linearly to a ratio of 1337 ETH per BTC. Today, these numbers would correspond to immense values, but at the time the price of a Bitcoin was around 400 dollars, which resulted in almost 30 cents per ETH (given the previous proportions). However, due to the absence of a cap on existing ETH units, almost 60 million coins were sold, totalling 31,529 BTC, about 18 M dollars.</p>
          <p>It was an incredible result, which encouraged other projects to follow the same fundraising strategy. Other ICOs following Ethereum, which boast much higher figures, would have been impossible without the one organised by Vitalik Buterin. In fact, thanks to its smart contracts, in particular the ERC-20 standard, Ethereum’s blockchain became the easiest way to develop a token and disseminate it on the market. As a result, all sales in ICOs were made in exchange for the Ether coin, which became very much in demand. So, let’s find out what Ether (ETH), the Ethereum coin, is and some of the most famous ICOs made possible by Ethereum’s ‘world computer’.</p>

          <div className="ac-note">
            <h4>Smart contract</h4>
            <p>A software that allows actions to be automatically triggered if certain conditions occur. The most common use case is to mediate a financial transaction between two entities on the blockchain. Ethereum is the first project to have provided a language and platform to allow anyone to develop smart contracts more easily.</p>
          </div>

          <h2 id="what-is-ethereum">What is Ethereum: Ether and the ERC-20</h2>
          <p>Ether is the cryptocurrency based on Ethereum’s distributed public blockchain. It was originally governed by a Proof of Work (PoW) consensus mechanism, similarly to Bitcoin, where ETH was given as reward for miners certifying blockchain transactions. Instead, Since The Merge update in September 2022, Proof-of-Stake has become the basis of the network, which is still powered by ETH. In particular, holders have to accumulate ETH in staking to be chosen as validators. ETH staking secures the blockchain, so it will be rewarded with more coins, but the purpose of ether does not stop there.</p>
          <p>In fact, Ether has the characteristics of a currency (medium of exchange, unit of account, store of value), but is also the payment method for the fees of each transaction and for access to the services of the ecosystem, populated by dApps and other DeFi applications.</p>
          <p>In addition to the 60M ETH distributed during the ICO, the founders decided to generate another 6M (9.9% of the coins sold) for the team and as many for the Ethereum Foundation. This process, known as pre-mine, caused some controversy, but has since been adopted by most other ICOs.</p>
          <p>Subsequent ICOs, as we have mentioned, were also supported by the innovation of the ERC-20 standard token. That is, an ethereum smart contract that essentially allows the basic parameters of a token to be defined in order to create it. These include:</p>
          <ul>
            <li>the name of the token;</li>
            <li>the relevant symbol;</li>
            <li>the number of decimal places to record fractions;</li>
            <li>the total supply of the token.</li>
          </ul>
          <p>Skip to the next paragraph to learn more about why the ERC-20 was instrumental in the huge emergence of ICOs.</p>

          <h2 id="success-and-demise">The success and demise of ICOs</h2>
          <p>Ethereum’s smart contract protocol is open-source, so anyone can create a token, manage its distribution and tend to other project needs. Indeed, in 2017, there was a boom of ICOs, all based on the Ethereum standard ERC-20 token, which made projects interoperable with the rest of the Ethereum network. Thus, the Ethereum blockchain was enriched by other applications, just as the value of ETH increased due to the large volume of exchanges that the ICOs generated.</p>
          <p>The huge amount of funds raised attracted the attention of the SEC (Securities and Exchange Commission), responsible for the security of the US financial markets. In fact, some projects were distributing securities with ICOs: in a nutshell, the tokens sold were not utilities, but were actual shares in the company’s profits without having licences to be such.</p>
          <p>This affected The DAO, a project built on Ethereum, whose token sale the SEC deemed an unregistered offering of securities, as well as the two largest token sales: Block.one, the company behind EOS, was forced to pay a $24M penalty (after a $4B ICO), while Telegram, which had raised $1.7B through two private sales of its TON token in 2018, was sued by the SEC, which argued the tokens were securities. In 2020, Telegram abandoned the project, paid an $18.5M fine and returned $1.2B to investors. TON was later continued independently by the community.</p>
        </div>

        {/* Scroll to top button */}
        <button
          className="ac-totop"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 20V6M6 12l6-6 6 6" stroke="#0f0f12" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {/* Buy CTA */}
        <div className="ac-buy">
          <div className="ac-buy-left">
            <span className="ac-buy-logo"><svg viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="#0f0f12" strokeWidth="1.6"/><path d="M8 8h6a3 3 0 0 1 0 6H8zM8 14h7a3 3 0 0 1 0 6H8z" fill="none" stroke="#0f0f12" strokeWidth="1.6"/><circle cx="17.5" cy="6.5" r="1.3" fill="#1663d9"/></svg>blockscaner</span>
            <h3>{_t("Buy ETH")}<br />{_t("on Blockscaner")}</h3>
            <a className="ac-buy-btn" href="/products" onClick={(e) => e.preventDefault()}>{_t("Buy now")} <span>→</span></a>
          </div>
          <div className="ac-buy-art">
            <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
              <rect width="200" height="120" fill="none"/>
              <rect x="20" y="34" width="110" height="70" rx="10" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
              <rect x="20" y="34" width="110" height="70" rx="10" fill="none" stroke="#0d0d12" strokeWidth="3"/>
              <circle cx="75" cy="69" r="20" fill="#3ddc84" stroke="#0d0d12" strokeWidth="3"/>
              <path d="M75 56 L84 70 L75 76 L66 70 Z" fill="#0d0d12"/>
              <rect x="112" y="52" width="66" height="42" rx="10" fill="#1663d9"/>
              <circle cx="130" cy="73" r="11" fill="#fff"/>
              <text x="152" y="78" fontSize="10" fontWeight="800" fill="#fff">ETH</text>
            </svg>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="ac-disclaimer">
          This content is provided solely for informational and educational purposes and does not constitute financial, legal
          or tax advice, nor does it represent a public offering or solicitation to invest pursuant to Legislative Decree
          58/1998 (TUF). Crypto-assets are highly volatile instruments and carry a significant risk of partial or total loss of
          invested capital. Past performance and any forecasts do not guarantee future results. For a detailed overview of
          the risks, please refer to the <a href="#" onClick={(e) => e.preventDefault()}>General Risk Disclosure</a>. The payment account offered by Blockscaner is regulated
          under Legislative Decree 11/2010 and cannot be equated with a bank current account; therefore, it does not
          benefit from the protections applicable to bank deposits. You are encouraged to perform your own independent
          and informed assessments, consult the latest <a href="#" onClick={(e) => e.preventDefault()}>Payment Account Terms and Conditions</a> and <a href="#" onClick={(e) => e.preventDefault()}>Currency Exchange
          Terms and Conditions</a>, and, where appropriate, seek advice from a qualified professional before making any
          financial or economic decision.
        </p>

        {/* Related */}
        <section className="ac-related">
          <h2>{_t("Related")}</h2>
          <div className="ac-grid">
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
                  <rect width="220" height="150" fill="#ffe9a8"/>
                  <path d="M0 150 L60 70 L120 110 L220 30 V150 Z" fill="#0d0d12" opacity=".9"/>
                  <circle cx="130" cy="66" r="30" fill="#ffd23f" stroke="#0d0d12" strokeWidth="3"/>
                  <text x="130" y="78" fontSize="30" fontWeight="800" textAnchor="middle" fill="#0d0d12">₿</text>
                  <circle cx="70" cy="104" r="16" fill="#ffd23f" stroke="#0d0d12" strokeWidth="3"/>
                  <text x="70" y="110" fontSize="16" fontWeight="800" textAnchor="middle" fill="#0d0d12">Ł</text>
                  <circle cx="48" cy="122" r="10" fill="#ffd23f" stroke="#0d0d12" strokeWidth="3"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Bitcoin</span></div>
              <h3>What is Bitcoin and how does it work?</h3>
              <p className="ac-desc">Bitcoin is the first cryptocurrency ever created, the most durable, strong and secure. Find out everything about its story and its functioning.</p>
              <p className="ac-meta">October 8, 2026&nbsp;&nbsp;•&nbsp;&nbsp;11 min</p>
            </article>
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
                  <rect width="220" height="150" fill="#ffb3c7"/>
                  <path d="M0 40 C40 10 80 20 110 50 C140 80 180 90 220 60 V0 H0 Z" fill="#0d0d12"/>
                  <circle cx="110" cy="84" r="30" fill="#fff"/>
                  <circle cx="110" cy="84" r="30" fill="none" stroke="#0d0d12" strokeWidth="3"/>
                  <path d="M94 76 L90 66 L100 70 Z M126 76 L130 66 L120 70 Z" fill="#ff5f8f" stroke="#0d0d12" strokeWidth="2"/>
                  <circle cx="100" cy="82" r="4" fill="#0d0d12"/><circle cx="120" cy="82" r="4" fill="#0d0d12"/>
                  <ellipse cx="110" cy="94" rx="8" ry="10" fill="#0d0d12"/>
                  <ellipse cx="110" cy="94" rx="4" ry="6" fill="#ff5f8f"/>
                  <circle cx="52" cy="112" r="14" fill="#fff"/><circle cx="176" cy="108" r="10" fill="#fff"/>
                  <circle cx="186" cy="46" r="12" fill="#ffb3c7" stroke="#0d0d12" strokeWidth="3"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">Meme</span></div>
              <h3>Popcat: what it is and how it works</h3>
              <p className="ac-desc">POPCAT: what it is and how the 'pop' cat meme coin works</p>
              <p className="ac-meta">May 8, 2026&nbsp;&nbsp;•&nbsp;&nbsp;7 min</p>
            </article>
            <article className="ac-card">
              <div className="ac-thumb"><Badge>Beginner</Badge>
                <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
                  <rect width="220" height="150" fill="#d9ccff"/>
                  <circle cx="110" cy="76" r="44" fill="#fff" stroke="#0d0d12" strokeWidth="3"/>
                  <circle cx="110" cy="76" r="34" fill="#0d0d12"/>
                  <text x="110" y="88" fontSize="34" fontWeight="800" textAnchor="middle" fill="#fff">T</text>
                  <g stroke="#8b5cf6" strokeWidth="3" fill="none">
                    <path d="M40 40 L80 60 M180 36 L142 62 M36 112 L76 94 M184 110 L144 92"/>
                  </g>
                  <circle cx="40" cy="40" r="10" fill="#8b5cf6"/><circle cx="180" cy="36" r="10" fill="#8b5cf6"/>
                  <circle cx="36" cy="112" r="10" fill="#8b5cf6"/><circle cx="184" cy="110" r="10" fill="#8b5cf6"/>
                </svg>
              </div>
              <div className="ac-tags"><span className="ac-tag">DeFi</span></div>
              <h3>Bittensor: What It Is and How It Works</h3>
              <p className="ac-desc">Explore Bittensor (TAO), the blockchain protocol decentralising machine learning. Learn about subnets, tokenomics, and the future of open-source AI.</p>
              <p className="ac-meta">February 11, 2026&nbsp;&nbsp;•&nbsp;&nbsp;12 min</p>
            </article>
          </div>
        </section>

      </div>
    </SiteLayout>
  );
}
