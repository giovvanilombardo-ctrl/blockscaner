import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ArtBitcoin = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#ffe9a8"/>
    <path d="M0 150 L60 70 L120 110 L220 30 V150 Z" fill="#0d0d12" opacity=".9"/>
    <circle cx="130" cy="66" r="30" fill="#ffd23f" stroke="#0d0d12" strokeWidth="3"/>
    <text x="130" y="78" fontSize="30" fontWeight="800" textAnchor="middle" fill="#0d0d12">₿</text>
    <circle cx="70" cy="104" r="16" fill="#ffd23f" stroke="#0d0d12" strokeWidth="3"/>
    <text x="70" y="110" fontSize="16" fontWeight="800" textAnchor="middle" fill="#0d0d12">Ł</text>
    <circle cx="48" cy="122" r="10" fill="#ffd23f" stroke="#0d0d12" strokeWidth="3"/>
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

export default function AcademyBitcoin() {
  return (
    <SiteLayout>
      <Seo title="What is Bitcoin and how does it work? — Blockscaner Academy" description="Bitcoin is the first cryptocurrency ever created, the most durable, strong and secure. Find out everything about its story and its functioning." />
      <div className="ac-article" data-testid="academy-article-bitcoin">

        {/* breadcrumb */}
        <p className="ac-crumb">
          <Link to="/products/academy">Home</Link>
          <span>›</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Cryptocurrencies</a>
          <span>›</span>
          <b>What is Bitcoin and how does it work?</b>
        </p>

        {/* header row */}
        <div className="ac-article-top">
          <Link to="/products/academy" className="ac-back" aria-label="Back to Academy"><ArrowLeft size={18} /></Link>
          <Tag>Bitcoin</Tag>
        </div>

        <div className="ac-article-head">
          <h1>{_t("What is Bitcoin and how")}<br />{_t("does it work?")}</h1>
          <div className="ac-share">
            <span className="ac-share-ic" aria-label="Share on X"><ShareIcon d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20z"/></span>
            <span className="ac-share-ic" aria-label="Share on Facebook"><ShareIcon d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></span>
            <span className="ac-share-ic" aria-label="Share on LinkedIn"><ShareIcon d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z"/></span>
          </div>
        </div>
        <p className="ac-meta">October 8, 2026&nbsp;&nbsp;•&nbsp;&nbsp;11 min</p>

        {/* hero image */}
        <div className="ac-article-thumb">
          <Badge>Beginner</Badge>
          {ArtBitcoin}
        </div>

        {/* You will learn */}
        <div className="ac-learn">
          <h2>{_t("You will learn")}</h2>
          <ul>
            <li><a href="#bitcoin-what">{_t("Bitcoin: what is it and how did it come about?")}</a></li>
            <li><a href="#bitcoin-cypherpunk">{_t("Bitcoin: what is Cypherpunk?")}</a></li>
            <li><a href="#bitcoin-genesis">{_t("The beginning of an era: the genesis of Bitcoin")}</a></li>
            <li><a href="#bitcoin-crypto-asset">{_t("Bitcoin: what is a crypto-asset and how does it work?")}</a></li>
            <li><a href="#bitcoin-value">{_t("What is the value of Bitcoin?")}</a></li>
            <li><a href="#bitcoin-value-evolved">{_t("How has Bitcoin's value evolved?")}</a></li>
            <li><a href="#bitcoin-long-term">{_t("Bitcoin in the long term")}</a></li>
            <li><a href="#bitcoin-new-internet">{_t("Bitcoin: the new Internet")}</a></li>
          </ul>
        </div>

        {/* Article body */}
        <div className="ac-body">
          <p>Bitcoin is the first successful crypto-asset. Even though others, before ‘Digital Gold’, were thought of, they were either never realised or implemented but never popularly adopted. In fact, Satoshi Nakamoto, the mysterious inventor of Bitcoin, was the first to really make it possible for people to exchange value without the need for an intermediary: thanks to blockchain technology. Let’s find out together, then, what Bitcoin is, how a crypto-asset works and what Bitcoin’s value depends on.</p>

          <h2 id="bitcoin-what">Bitcoin: what is it and how did it come about?</h2>
          <p>To understand what Bitcoin is and how it works, you must first understand its history. Let us start with the genesis: behind the pseudonym Satoshi Nakamoto, lies the extraordinary inventor of Bitcoin. In 2009, the person or group behind the pseudonym launched the crypto-asset in response to the financial crisis. A project based on blockchain technology, capable of opposing the centralised and unequal global monetary system.</p>
          <p>To this day, Nakamoto’s true identity is still unknown, although there are suppositions and a few self-proclaimed figures. We are not even sure whether the ‘creator of Bitcoin’ is rather a group of computer scientists or a single individual: a desire for anonymity that is not surprising. After all Bitcoin is a network of peers, no one exclusively owns its cryptographic code, not even the creator. Satoshi Nakamoto, therefore, did not need to present his authority for Bitcoin to work: this is decentralisation.</p>
          <p>The enigma surrounding his identity, however, is something of a legend: in 2008 Satoshi published Bitcoin’s whitepaper online (Bitcoin: A Peer-to-Peer Electronic Cash System), a document in which he claimed to have created a payment system that did not need banks and was capable of transcending all geographical and political boundaries. Bitcoin, in fact, is exchanged peer-to-peer (p2p) and its security does not need the authority of third parties, as it is based on a cryptographic protocol. Moreover, its issuance curve follows an anti-inflationary algorithm: Bitcoin is designed to preserve its purchasing power over time, but its value will in any case be subject to the market, as we shall see.</p>
          <p>While creating Bitcoin, Satoshi Nakamoto made use of already known concepts and technologies: cryptography, blockchain, the mechanism for validating transactions (Proof-of-Work), and even the very idea of ‘crypto-asset‘ was not new. However, Nakamoto had the merit of combining and realising them. But where did these ideas originate?</p>

          <h2 id="bitcoin-cypherpunk">Bitcoin: what is Cypherpunk?</h2>
          <p>Many concepts central to Bitcoin were developed by an online community: the Cypherpunks, a group of digital privacy activists led by figures such as Timothy May. As part of their mission, they wanted to create digital money that was as anonymous as cash. In fact, several experiments with digital currencies were already circulating on Cypherpunk mailing lists in the 1990s.</p>
          <p>Adam Back, a British researcher, created hashcash: the mechanism for producing blocks, called Proof-of-Work, which later became a central component of Bitcoin. Another digital currency project, called b money, was conceived by a computer engineer named Wei Dai. In 1998, Nick Szabo sent his digital money project, called Bit Gold, to a small group of enthusiasts, including Wei Dai himself and Hal Finney. They tried to create a working version of it: Bit Gold was the closest attempt to Bitcoin, a scarce digital token, like gold, that could be sent electronically, without having to go through a central authority such as a bank.</p>
          <p>The first people Satoshi Nakamoto emailed the Bitcoin white paper to were Mr. Back and Mr. Dai, perhaps in gratitude for their research. In addition, Mr. Finney, who passed away in 2014, helped Satoshi improve the Bitcoin software in the autumn of 2008, before it was released publicly.</p>

          <h2 id="bitcoin-genesis">The beginning of an era: the genesis of Bitcoin</h2>
          <p>The first block of a blockchain is known as the Genesis Block, and Bitcoin’s block marked the beginning of an era: created on 3 January 2009 at 18:18, its cryptographic reference code (hash) is known to all network participants as a starting point, a so-called ‘secure root’. In fact, each block is immutably linked to the first through the hash function, so as to build an eternal history of Bitcoin transactions, contained precisely in the blocks.</p>
          <p>Satoshi decided to emphasise the historic event of Bitcoin’s birth by writing a message within the only transaction in the first block:</p>
          <blockquote className="ac-quote">The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.</blockquote>
          <p>The sentence refers to the headline of an article in The Times of 3 January 2009. At the time, in fact, we were still in the midst of a financial crisis and, with this comment, Satoshi Nakamoto wanted to state his motivations for creating Bitcoin, etching them into the genesis block. The sentence condenses Bitcoin’s antithetical stance to the current financial system, while at the same time representing a kind of manifesto: it ushers in the birth of an alternative monetary policy.</p>

          <h2 id="bitcoin-crypto-asset">Bitcoin: what is a crypto-asset and how does it work?</h2>
          <p>Bitcoin, whose ticker is BTC, is the first successful blockchain-based currency and the first successful application of this revolutionary technology.</p>
          <p>Bitcoin is a crypto-asset and, as such, has a monetary value, like any fiat currency. Unlike the latter, however, Bitcoin circulates in a decentralised system that does not require intermediaries, such as banks. The issuance and security of crypto-assets, in general, is programmed and controlled by cryptographic systems and algorithms called consensus mechanisms.</p>
        </div>

        {/* Academy summary cards */}
        <section className="ac-summary" data-testid="bitcoin-summary">
          <div className="ac-summary-brand">
            <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span>academy</span>
          </div>

          <div className="ac-summary-grid">
            <div className="ac-sum">
              <span className="ac-sum-ic">
                <svg viewBox="0 0 48 48" width="52" height="52">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#0d0d12" strokeWidth="1.6"/>
                  <text x="24" y="30" fontSize="18" fontWeight="800" textAnchor="middle" fill="#0d0d12">₿</text>
                  <path d="M38 8l2.2 4.6 4.6.6-3.4 3.2.9 4.7-4.3-2.3-4.3 2.3.9-4.7-3.4-3.2 4.6-.6z" fill="#7c5cff"/>
                </svg>
              </span>
              <p>Bitcoin is the <b>first cryptocurrency</b> ever.</p>
            </div>

            <div className="ac-sum">
              <span className="ac-sum-ic">
                <svg viewBox="0 0 48 48" width="52" height="52">
                  <g fill="none" stroke="#0d0d12" strokeWidth="1.4">
                    <rect x="14" y="10" width="10" height="10" rx="2"/><rect x="26" y="10" width="10" height="10" rx="2"/>
                    <rect x="8" y="22" width="10" height="10" rx="2"/><rect x="20" y="22" width="10" height="10" rx="2"/><rect x="32" y="22" width="10" height="10" rx="2"/>
                    <rect x="14" y="34" width="10" height="10" rx="2"/><rect x="26" y="34" width="10" height="10" rx="2"/>
                  </g>
                  <path d="M24 2l2 4.2 4.2.5-3.1 2.9.8 4.4-3.9-2.1-3.9 2.1.8-4.4-3.1-2.9 4.2-.5z" fill="#7c5cff"/>
                </svg>
              </span>
              <p>The bitcoin <b>Blockchain</b> was the <b>first ever created.</b></p>
            </div>

            <div className="ac-sum">
              <span className="ac-sum-ic">
                <svg viewBox="0 0 48 48" width="52" height="52">
                  <path d="M8 10l2.6 5.3 5.4.7-4 3.7 1 5.3-5-2.7-5 2.7 1-5.3-4-3.7 5.4-.7z" fill="#c9a7ff"/>
                  <circle cx="27" cy="22" r="16" fill="none" stroke="#0d0d12" strokeWidth="1.6"/>
                  <text x="27" y="28" fontSize="15" fontWeight="800" textAnchor="middle" fill="#0d0d12">₿</text>
                  <path d="M40 30l2 4.2 4.2.5-3.1 2.9.8 4.4-3.9-2.1-3.9 2.1.8-4.4-3.1-2.9 4.2-.5z" fill="#7c5cff"/>
                </svg>
              </span>
              <p>Bitcoin is the <b>most popular cryptocurrency</b> and top of the market.</p>
            </div>

            <div className="ac-sum">
              <span className="ac-sum-ic">
                <svg viewBox="0 0 48 48" width="52" height="52">
                  <text x="24" y="14" fontSize="9" fontWeight="700" textAnchor="middle" fill="#0d0d12">21,000,000</text>
                  <g fill="none" stroke="#0d0d12" strokeWidth="1.2">
                    {[0,1,2,3,4,5,6,7].map((i) => (
                      <circle key={i} cx={7 + i * 4.9} cy="24" r="2.1"/>
                    ))}
                    {[0,1,2,3,4,5,6,7].map((i) => (
                      <circle key={"b"+i} cx={7 + i * 4.9} cy="32" r="2.1"/>
                    ))}
                    {[0,1,2,3,4,5,6,7].map((i) => (
                      <circle key={"c"+i} cx={7 + i * 4.9} cy="40" r="2.1"/>
                    ))}
                  </g>
                </svg>
              </span>
              <p>There won't ever be more than <b>21 million BTC</b> in circulation.</p>
            </div>

            <div className="ac-sum">
              <span className="ac-sum-ic">
                <svg viewBox="0 0 48 48" width="52" height="52">
                  <path d="M19 14a6 6 0 0 1 12 0c0 4-5 5-5 9" fill="none" stroke="#0d0d12" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="25" cy="31" r="2.4" fill="none" stroke="#0d0d12" strokeWidth="1.8"/>
                </svg>
              </span>
              <p>Bitcoin was <b>invented</b> by a group or an individual going by the pseudonym <b>Satoshi Nakamoto.</b></p>
            </div>

            <div className="ac-sum">
              <span className="ac-sum-ic">
                <svg viewBox="0 0 48 48" width="52" height="52">
                  <circle cx="24" cy="24" r="14" fill="none" stroke="#0d0d12" strokeWidth="1.6"/>
                  <text x="24" y="29" fontSize="13" fontWeight="800" textAnchor="middle" fill="#0d0d12">₿</text>
                  <circle cx="8" cy="14" r="5.4" fill="none" stroke="#0d0d12" strokeWidth="1.4"/><text x="8" y="17" fontSize="6" fontWeight="800" textAnchor="middle" fill="#0d0d12">Y</text>
                  <circle cx="40" cy="12" r="5.4" fill="none" stroke="#0d0d12" strokeWidth="1.4"/><text x="40" y="15" fontSize="6" fontWeight="800" textAnchor="middle" fill="#0d0d12">◆</text>
                  <circle cx="9" cy="36" r="5.4" fill="none" stroke="#0d0d12" strokeWidth="1.4"/><text x="9" y="39" fontSize="6" fontWeight="800" textAnchor="middle" fill="#0d0d12">$</text>
                  <circle cx="40" cy="36" r="5.4" fill="none" stroke="#0d0d12" strokeWidth="1.4"/><text x="40" y="39" fontSize="6" fontWeight="800" textAnchor="middle" fill="#0d0d12">Ł</text>
                </svg>
              </span>
              <p>Bitcoin <b>inspired</b> all other crypto that came after, that's why they are called "alternative coins", in short "altcoins".</p>
            </div>
          </div>
        </section>

        {/* Article body — continued */}
        <div className="ac-body" style={{ marginTop: "3rem" }}>
          <h2 id="bitcoin-value">What is the value of Bitcoin?</h2>
          <p>The value of Bitcoin was not established at the moment of its creation, nor can it be actively regulated by governments or central banks. The fluctuation in the value of BTC depends essentially on trading volumes, i.e. on how much people and institutions buy or sell Bitcoin. Like any scarce commodity, the more people want to buy it, the more its price should rise. The law of supply and demand therefore drives its price.</p>
          <p>However, for Bitcoin and other crypto-assets, you could recognise an intrinsic value, independent of the market factor. We are talking about the value and potential of the underlying technologies: crypto-assets are programmes developed on blockchain, and from the latter derive their advantages, namely cryptographic security, decentralisation and programmability. A currency for all controlled by none.</p>
          <p>Indeed, being based on codes and algorithms, the functioning of crypto-assets depends on a predetermined logic. Bitcoin responds, in short, to a complex ‘set’ of conditions and automatisms, from which its use cases are derived. This has another valuable implication: subject to agreement between network participants, in a process called governance, the logic of crypto-assets can be adapted to new needs, precisely because of programmability.</p>
          <p>Returning to Bitcoin’s tokenomics, Nakamoto set a maximum of 21 million Bitcoins, certainly divisible into smaller fractions (the minimum unit is called a ‘satoshi’ and corresponds to 0.00000001 Bitcoin), but with the idea that the scarcity would guarantee greater stability to its value.</p>
          <p>Bitcoins are produced and distributed as a reward for those (called miners) who keep the blockchain secure. However, the issuance of BTC has a particular pattern: every four years approximately, starting in 2009, the reward halves, through to a mechanism called Halving. Starting with a reward of 50 BTC per block, it is estimated that the last fraction of Bitcoin will be distributed in 2140. This system should, theoretically, counter Bitcoin’s inflation.</p>
          <p>Despite the hype around Bitcoin as a potential means of payment of the future, in certain market scenarios many have considered it a safe haven asset, supported by the fact that it shares some characteristics with gold, such as scarcity: this is why it is also called ‘Digital Gold‘.</p>

          <h2 id="bitcoin-value-evolved">How has Bitcoin’s value evolved?</h2>
          <p>Bitcoin went from being a simple concept, outlined in Satoshi’s White Paper, to becoming a real currency. These are the most important stages in its history:</p>
        </div>

        {/* Academy timeline */}
        <section className="ac-timeline" data-testid="bitcoin-timeline">
          <div className="ac-summary-brand">
            <span className="ac-summary-check"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <span>academy</span>
          </div>

          <div className="ac-tl">
            <div className="ac-tl-line" />

            {/* 2008 — content below */}
            <div className="ac-tl-item">
              <div className="ac-tl-art top">
                <svg viewBox="0 0 40 48" width="34" height="40"><rect x="8" y="4" width="24" height="40" rx="4" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><line x1="13" y1="14" x2="27" y2="14" stroke="#0d0d12" strokeWidth="1.4"/><line x1="13" y1="20" x2="27" y2="20" stroke="#0d0d12" strokeWidth="1.4"/><line x1="13" y1="26" x2="23" y2="26" stroke="#0d0d12" strokeWidth="1.4"/></svg>
              </div>
              <div className="ac-tl-year">2008</div>
              <p className="ac-tl-txt bottom">Satoshi Nakamoto published Bitcoin's <b>Whitepaper</b>, providing a <b>proof of concept</b> for the Bitcoin system.</p>
            </div>

            {/* 2009 — content above */}
            <div className="ac-tl-item">
              <p className="ac-tl-txt top">Satoshi releases the <b>software</b> and officially launches bitcoin, the <b>first cryptocurrency</b> in history.</p>
              <div className="ac-tl-year">2009</div>
              <div className="ac-tl-art bottom">
                <svg viewBox="0 0 40 40" width="36" height="36"><circle cx="20" cy="20" r="15" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><text x="20" y="25" fontSize="13" fontWeight="800" textAnchor="middle" fill="#0d0d12">₿</text><path d="M34 6l1.6 3.4 3.4.4-2.5 2.4.6 3.4-3.1-1.7-3.1 1.7.6-3.4-2.5-2.4 3.4-.4z" fill="#0d0d12"/></svg>
              </div>
            </div>

            {/* 2011 — content below */}
            <div className="ac-tl-item">
              <div className="ac-tl-art top">
                <svg viewBox="0 0 52 40" width="48" height="36"><circle cx="16" cy="16" r="12" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><text x="16" y="21" fontSize="12" fontWeight="800" textAnchor="middle" fill="#0d0d12">₿</text><rect x="26" y="10" width="10" height="8" rx="2" fill="#c9a7ff" transform="rotate(12 31 14)"/><circle cx="40" cy="20" r="11" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><text x="40" y="25" fontSize="11" fontWeight="800" textAnchor="middle" fill="#0d0d12">$</text></svg>
              </div>
              <div className="ac-tl-year">2011</div>
              <p className="ac-tl-txt bottom">Bitcoin reaches <b>parity with the US dollar</b> (1 BTC = 1 USD), thus acquiring the status of <b>means of payment</b>.</p>
            </div>

            {/* 2013 — content above */}
            <div className="ac-tl-item">
              <p className="ac-tl-txt top">In December bitcoin comes very close to <b>parity with gold</b> (1 BTC = 1 golden ounce).</p>
              <div className="ac-tl-year">2013</div>
              <div className="ac-tl-art bottom">
                <svg viewBox="0 0 48 36" width="44" height="32"><circle cx="12" cy="12" r="10" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><text x="12" y="16" fontSize="10" fontWeight="800" textAnchor="middle" fill="#0d0d12">₿</text><rect x="20" y="10" width="9" height="7" rx="2" fill="#c9a7ff" transform="rotate(12 24 13)"/><path d="M30 28 L44 28 L37 14 Z" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><path d="M40 6l1.2 2.6 2.6.3-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.3z" fill="#0d0d12"/></svg>
              </div>
            </div>

            {/* 2017 — content below */}
            <div className="ac-tl-item">
              <div className="ac-tl-art top">
                <svg viewBox="0 0 44 44" width="40" height="40"><circle cx="22" cy="22" r="14" fill="none" stroke="#0d0d12" strokeWidth="1.6"/><text x="22" y="27" fontSize="13" fontWeight="800" textAnchor="middle" fill="#0d0d12">₿</text><path d="M36 10 C42 16 42 28 36 34" fill="none" stroke="#0d0d12" strokeWidth="1.4" strokeDasharray="3 3"/></svg>
              </div>
              <div className="ac-tl-year">2017</div>
              <p className="ac-tl-txt bottom">On the year of the crypto boom, bitcoin reaches the price of <b>20,000$</b> with a billion transactions per day, finally becoming <b>a financial asset</b>.</p>
            </div>
          </div>
        </section>

      </div>
    </SiteLayout>
  );
}
