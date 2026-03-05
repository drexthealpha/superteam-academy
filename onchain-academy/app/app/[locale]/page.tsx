<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Superteam Academy - Learn Solana Development</title>
  <meta name="description" content="Learn to build on Solana. Earn on-chain XP and credential NFTs.">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; background: #0a0a0a; color: #fff; line-height: 1.6; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    header { position: sticky; top: 0; background: rgba(10,10,10,0.9); backdrop-filter: blur(8px); border-bottom: 1px solid #222; padding: 16px 0; z-index: 50; }
    header .container { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-weight: 700; font-size: 18px; }
    nav { display: flex; gap: 24px; }
    nav a { color: #888; text-decoration: none; font-size: 14px; transition: color 0.2s; }
    nav a:hover { color: #fff; }
    .btn { display: inline-flex; align-items: center; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none; transition: all 0.2s; }
    .btn-primary { background: #a855f7; color: #fff; }
    .btn-primary:hover { background: #9333ea; }
    .btn-outline { border: 1px solid #333; color: #fff; }
    .btn-outline:hover { border-color: #555; }
    .hero { padding: 120px 0; text-align: center; }
    .hero h1 { font-size: 56px; font-weight: 800; line-height: 1.1; margin-bottom: 24px; }
    .hero h1 span { color: #a855f7; }
    .hero p { font-size: 20px; color: #888; max-width: 600px; margin: 0 auto 40px; }
    .hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .stats { border-y: 1px solid #222; padding: 60px 0; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center; }
    .stats-grid .value { font-size: 36px; font-weight: 700; }
    .stats-grid .label { font-size: 14px; color: #888; }
    .features { padding: 100px 0; background: #111; }
    .features h2 { font-size: 32px; text-align: center; margin-bottom: 48px; }
    .features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .feature-card { padding: 24px; background: #1a1a1a; border-radius: 12px; border: 1px solid #222; }
    .feature-icon { font-size: 32px; margin-bottom: 16px; }
    .feature-card h3 { font-size: 16px; margin-bottom: 8px; }
    .feature-card p { font-size: 14px; color: #888; }
    .testimonials { padding: 100px 0; }
    .testimonials h2 { font-size: 32px; text-align: center; margin-bottom: 48px; }
    .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .testimonial-card { padding: 24px; background: #1a1a1a; border-radius: 12px; border: 1px solid #222; }
    .testimonial-card p { font-size: 14px; color: #aaa; font-style: italic; margin-bottom: 16px; }
    .testimonial-author { font-size: 14px; font-weight: 600; }
    .testimonial-role { font-size: 12px; color: #666; }
    .paths { padding: 100px 0; }
    .paths h2 { font-size: 32px; text-align: center; margin-bottom: 48px; }
    .paths-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .path-card { padding: 24px; background: #1a1a1a; border-radius: 12px; border: 1px solid #222; }
    .path-card h3 { font-size: 18px; margin-bottom: 8px; }
    .path-card p { font-size: 14px; color: #888; margin-bottom: 16px; }
    .path-meta { display: flex; gap: 16px; font-size: 12px; color: #666; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 500; }
    .badge-beginner { background: #22c55e20; color: #22c55e; }
    .badge-intermediate { background: #eab30820; color: #eab308; }
    .badge-advanced { background: #ef444420; color: #ef4444; }
    footer { border-top: 1px solid #222; padding: 48px 0; }
    footer .container { display: flex; justify-content: space-between; align-items: center; }
    footer p { font-size: 12px; color: #666; }
    @media (max-width: 768px) {
      .hero h1 { font-size: 36px; }
      .stats-grid, .features-grid, .testimonials-grid, .paths-grid { grid-template-columns: 1fr; }
      nav { display: none; }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <span class="logo">Superteam Academy</span>
      <nav>
        <a href="/en/courses">Courses</a>
        <a href="/en/leaderboard">Leaderboard</a>
        <a href="/en/dashboard">Dashboard</a>
        <a href="/en/community">Community</a>
      </nav>
      <a href="/en/onboarding" class="btn btn-primary">Get Started</a>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Learn to Build on <span>Solana</span></h1>
      <p>Master Solana development through interactive courses. Earn soulbound XP tokens and verifiable credential NFTs.</p>
      <div class="hero-btns">
        <a href="/en/onboarding" class="btn btn-primary">Start Learning Free →</a>
        <a href="/en/courses" class="btn btn-outline">Explore Courses</a>
      </div>
    </div>
  </section>

  <section class="stats">
    <div class="container">
      <div class="stats-grid">
        <div><div class="value">12+</div><div class="label">Courses</div></div>
        <div><div class="value">150+</div><div class="label">Lessons</div></div>
        <div><div class="value">2.4M</div><div class="label">XP Distributed</div></div>
        <div><div class="value">850+</div><div class="label">Credentials Issued</div></div>
      </div>
    </div>
  </section>

  <section class="features">
    <div class="container">
      <h2>Why Superteam Academy</h2>
      <div class="features-grid">
        <div class="feature-card"><div class="feature-icon">📚</div><h3>Interactive Courses</h3><p>Hands-on Solana development with in-browser coding challenges.</p></div>
        <div class="feature-card"><div class="feature-icon">⛓️</div><h3>On-Chain XP</h3><p>Earn soulbound Token-2022 XP for every lesson completed.</p></div>
        <div class="feature-card"><div class="feature-icon">🏆</div><h3>Credential NFTs</h3><p>Receive Metaplex Core NFTs as proof of mastery.</p></div>
        <div class="feature-card"><div class="feature-icon">🔐</div><h3>Decentralized</h3><p>Course enrollments recorded on-chain.</p></div>
      </div>
    </div>
  </section>

  <section class="testimonials">
    <div class="container">
      <h2>What Learners Say</h2>
      <div class="testimonials-grid">
        <div class="testimonial-card"><p>"Superteam Academy took me from zero to deploying my first Solana program in just 2 weeks."</p><div class="testimonial-author">Alex Chen</div><div class="testimonial-role">DeFi Developer</div></div>
        <div class="testimonial-card"><p>"The on-chain credentials are game-changing. My NFT helped me land interviews."</p><div class="testimonial-author">Maria Santos</div><div class="testimonial-role">Frontend Engineer</div></div>
        <div class="testimonial-card"><p>"Best Web3 learning platform I've used. The XP system keeps you motivated."</p><div class="testimonial-author">Dev Kumar</div><div class="testimonial-role">Full-Stack Developer</div></div>
      </div>
    </div>
  </section>

  <section class="paths">
    <div class="container">
      <h2>Learning Paths</h2>
      <div class="paths-grid">
        <div class="path-card">
          <span class="badge badge-beginner">Beginner</span>
          <h3>Solana Fundamentals</h3>
          <p>Accounts, transactions, PDAs, and the Solana programming model from scratch.</p>
          <div class="path-meta"><span>12 lessons</span><span>1,200 XP</span></div>
        </div>
        <div class="path-card">
          <span class="badge badge-intermediate">Intermediate</span>
          <h3>Anchor Development</h3>
          <p>Build, test, and deploy Solana programs using the Anchor framework.</p>
          <div class="path-meta"><span>16 lessons</span><span>2,400 XP</span></div>
        </div>
        <div class="path-card">
          <span class="badge badge-advanced">Advanced</span>
          <h3>Token Engineering</h3>
          <p>Token-2022 extensions, Metaplex Core, soulbound tokens, and token economics.</p>
          <div class="path-meta"><span>10 lessons</span><span>2,000 XP</span></div>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>Built on Solana. Open source.</p>
      <p>© 2026 Superteam Brazil</p>
    </div>
  </footer>
</body>
</html>
