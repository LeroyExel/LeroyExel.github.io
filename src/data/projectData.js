// src/data/projectData.js
export const modDetails = {
  longdrive: {
    title: 'The Long Drive – Custom Car',
    engine: 'Unity · C# · AssetBundles',
    video: '/Projects/fiverr/longdrive/endresult.mp4',
    reviewImage: '/Projects/fiverr/longdrive/review.jpeg',
    description: `
      <p>For <strong>The Long Drive</strong> I made a fully working custom car. I used <strong>C#</strong>, <strong>Unity AssetBundles</strong> and <strong>stripped in-game scripts</strong> to get the car into the game.</p>
      <p>What I did:</p>
      <ul class="list-disc list-inside space-y-1 text-muted">
        <li><strong>AssetBundles</strong> — The car is packed as an AssetBundle so it can be loaded dynamically without modifying the game itself.</li>
        <li><strong>Stripped scripts</strong> — I stripped down the existing game scripts to the core and adapted them so the custom car just works with the game logic.</li>
        <li><strong>Physics</strong> — Chassis and wheels with custom colliders, mass distribution and suspension. Feels the same as the original cars.</li>
        <li><strong>Engine & sound</strong> — Torque, RPM and sound that reacts to speed and load.</li>
        <li><strong>Custom textures</strong> — You can add your own colors and parts.</li>
      </ul>
      <p>The mod is fully tested and works seamlessly in the game. No crashes, no weird bugs — just a working custom car.</p>
    `,
    tags: ['Unity', 'C#', 'AssetBundles', 'Physics', 'Vehicles'],
    extra: '⭐ 5.0 · 1 review · Commissioned for a single client',
  },
};