import { NextResponse } from 'next/server';

export async function GET() {
  const username = process.env.GITHUB_USERNAME || 'ddaniiiiell';

  const mockRepos = [
    {
      name: 'portfolio-website',
      description: 'My high-fidelity interactive portfolio built using Next.js App Router and Vanilla CSS design tokens.',
      language: 'JavaScript',
      stargazers_count: 5,
      forks_count: 1,
    },
    {
      name: 'vibesync-collaboration',
      description: 'Real-time collaborative canvas workspaces and live integrated group messaging using raw websockets.',
      language: 'JavaScript',
      stargazers_count: 12,
      forks_count: 4,
    },
    {
      name: 'auraui-core',
      description: 'Headless, accessible (A11y compliant) React component library implementing a glassmorphism style sheet.',
      language: 'CSS',
      stargazers_count: 8,
      forks_count: 0,
    },
  ];

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
      headers: {
        'User-Agent': 'NextJS-Portfolio-App',
      },
      next: { revalidate: 3600 }, // Cache response for 1 hour on Vercel
    });

    if (!res.ok) {
      // Return mock data if GitHub rate limits or user does not exist
      return NextResponse.json({ repos: mockRepos });
    }

    const data = await res.json();
    
    // Clean and format GitHub response
    const formattedRepos = data
      .filter((repo) => !repo.fork) // Focus on original projects
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
      }))
      .slice(0, 6);

    return NextResponse.json({ repos: formattedRepos.length > 0 ? formattedRepos : mockRepos });
  } catch (error) {
    console.error('GitHub API Route Error:', error);
    // Return mock data as a safe fallback
    return NextResponse.json({ repos: mockRepos });
  }
}
