import { type ReactNode, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useCreateCareerProfile,
  getGetCareerProfileQueryKey,
  useGetCareerProfile,
  useUpdateCareerProgress,
  type CareerDashboard,
  type CareerProfileInput,
} from '@workspace/api-client-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronLeft,
  CircleUserRound,
  Code2,
  FileText,
  Lightbulb,
  ListChecks,
  Pencil,
  Plus,
  RotateCcw,
  Sparkles,
  Target,
  Upload,
} from 'lucide-react';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

const queryClient = new QueryClient();

type Profile = CareerProfileInput;

const starterProfile: Profile = {
  name: 'Maya Chen',
  degree: 'B.A. Cognitive Science',
  school: 'University of Washington',
  skills: ['Python', 'User research', 'Figma', 'SQL'],
  interests: ['Climate', 'Technology', 'People problems'],
  resume: 'maya-chen-resume.pdf',
};

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <a className="brand" href="/" data-testid="link-brand">
      <span className="brand-mark" aria-hidden="true" />
      <span style={dark ? { color: 'hsl(45 36% 97%)' } : undefined}>carin</span>
    </a>
  );
}

function Landing({ begin }: { begin: () => void }) {
  return (
    <div className="site-shell landing noise">
      <header className="container-wide topbar">
        <Brand />
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#how-it-works" data-testid="link-how-it-works">How it works</a>
          <a href="#sample-path" data-testid="link-sample-path">Sample path</a>
          <a href="#why-carin" data-testid="link-why-carin">Why Carin</a>
        </nav>
        <button className="nav-cta" onClick={begin} data-testid="button-start-nav">Find my path</button>
      </header>

      <main>
        <section className="container-wide hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">A clearer next step for students</div>
              <h1 className="display-xl" style={{ marginTop: 17 }}>
                Your degree is a start.<br /><span className="accent-word">Not a verdict.</span>
              </h1>
              <p className="body-lg">
                Carin turns the things you have already learned into a practical career direction — roles to explore, skills to build, and projects that make the leap feel doable.
              </p>
              <button className="button-primary" onClick={begin} data-testid="button-start-hero">Build my path</button>
              <div className="hero-note">
                <div className="mini-avatars" aria-hidden="true">
                  <span className="mini-avatar">AR</span><span className="mini-avatar">JM</span><span className="mini-avatar">SK</span>
                </div>
                <span>Built for the in-between students — curious, capable, not quite decided.</span>
              </div>
            </div>
            <div className="reveal-card" aria-label="Sample Carin recommendation">
              <div className="reveal-label">MAYA'S PATH SIGNAL / UPDATED NOW</div>
              <div className="reveal-score">
                <span className="score-number">84</span>
                <span className="score-caption">fit for Product Researcher, based on your profile</span>
              </div>
              <div className="path-lines">
                <div className="path-line"><span>Research</span><div className="path-bar"><i style={{ width: '88%' }} /></div><strong>strong</strong></div>
                <div className="path-line"><span>Systems thinking</span><div className="path-bar"><i style={{ width: '71%' }} /></div><strong>growing</strong></div>
                <div className="path-line"><span>Experiment design</span><div className="path-bar"><i style={{ width: '43%' }} /></div><strong>next</strong></div>
              </div>
              <div className="reveal-footer"><span>3 roles worth a closer look</span><span>01 / 04</span></div>
            </div>
          </div>
        </section>

        <div className="ticker" aria-label="Carin outcomes">
          <div className="container-wide">
            <span><b>01</b> Start with what is already true</span>
            <span><b>02</b> See the gap without the panic</span>
            <span><b>03</b> Make one useful thing next</span>
            <span><b>04</b> Walk into interviews with a point of view</span>
          </div>
        </div>

        <section className="section" id="how-it-works">
          <div className="container-wide">
            <div className="section-header">
              <div>
                <div className="eyebrow">A short route to a real direction</div>
                <h2 className="display-lg" style={{ marginTop: 15 }}>Less guessing.<br />More evidence.</h2>
              </div>
              <p>Not another personality quiz. Carin connects your actual experience to the shape of work that could fit — then gives you a next move you can finish this week.</p>
            </div>
            <div className="steps">
              <article className="step"><span className="step-number">01 / TELL US</span><h3>Bring the messy version</h3><p>Paste a resume, pick the skills you trust, and name the questions you keep coming back to.</p></article>
              <article className="step"><span className="step-number">02 / SEE IT</span><h3>Get the connective tissue</h3><p>Carin maps your signals to roles, missing skills, courses, and projects — with the reasoning left in.</p></article>
              <article className="step"><span className="step-number">03 / MOVE</span><h3>Make progress visible</h3><p>Follow a four-week route and return whenever the question changes. Your path can change too.</p></article>
            </div>
          </div>
        </section>

        <section className="section" id="sample-path" style={{ paddingTop: 20 }}>
          <div className="container-wide">
            <div className="teaser">
              <div className="teaser-copy">
                <div className="eyebrow">A sample output / Maya, cognitive science</div>
                <h2 className="display-lg" style={{ marginTop: 15 }}>Specific beats impressive.</h2>
                <p style={{ marginTop: 18 }}>The useful answer is not “you could do anything.” It is “start here, and here is why this fits what you have already shown.”</p>
              </div>
              <div className="teaser-list">
                <div className="teaser-row"><div><strong>Product Researcher</strong><small>Strong match · 84 fit</small></div><span className="teaser-pill">because you notice people</span></div>
                <div className="teaser-row"><div><strong>Climate Data Analyst</strong><small>Stretch match · 68 fit</small></div><span className="teaser-pill">because you ask why</span></div>
                <div className="teaser-row"><div><strong>UX Content Strategist</strong><small>Strong match · 79 fit</small></div><span className="teaser-pill">because you make clear</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="quote-band" id="why-carin">
          <div className="container-wide">
            <div className="quote">“I knew I liked solving people problems. Carin helped me see that as a <em>career signal</em>, not a personality trait.”</div>
            <div className="quote-by">— Jordan Morales / junior, information science</div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container-wide">
            <div className="eyebrow">You do not need the five-year answer</div>
            <h2 className="display-lg">You need a next step that teaches you something.</h2>
            <p>Start with the profile you have today. Carin will help you make the next version sharper.</p>
            <button className="button-primary" onClick={begin} data-testid="button-start-footer">Start with my profile</button>
            <footer className="footer"><span>© 2025 Carin</span><span>For students finding their signal.</span></footer>
          </div>
        </section>
      </main>
    </div>
  );
}

const skillChoices = ['Python', 'SQL', 'Figma', 'User research', 'Public speaking', 'Data visualization', 'Writing', 'Project planning', 'HTML & CSS', 'Statistics'];
const interestChoices = ['Climate', 'Technology', 'People problems', 'Public good', 'Storytelling', 'Healthcare', 'Designing systems', 'Making things'];

function Onboarding({ profile, setProfile, onCreated, restart }: { profile: Profile; setProfile: (p: Profile) => void; onCreated: (dashboard: CareerDashboard) => void; restart: () => void }) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<'upload' | 'paste'>('upload');
  const [pasted, setPasted] = useState('');
  const [parsing, setParsing] = useState(false);
  const [resumeSelected, setResumeSelected] = useState(Boolean(profile.resume));
  const [submitError, setSubmitError] = useState('');
  const totalSteps = 4;
  const createProfile = useCreateCareerProfile();

  const updateProfile = (patch: Partial<Profile>) => setProfile({ ...profile, ...patch });
  const canContinue = step !== 1 || resumeSelected || pasted.trim().length > 20;
  const buildPath = () => {
    setSubmitError('');
    setParsing(true);
    createProfile.mutate(
      { data: profile },
      {
        onSuccess: onCreated,
        onError: () => {
          setParsing(false);
          setSubmitError('We could not save your path. Check that the API is running, then try again.');
        },
      },
    );
  };

  if (parsing || createProfile.isPending) {
    return (
      <div className="onboarding-wrap noise">
        <div className="container-narrow">
          <div className="onboarding-top"><Brand /><small>Preparing your first path</small></div>
          <div className="parse-state">
            <div><div className="parse-orbit" /><h2>Reading between the lines.</h2><p>Saving your profile and generating recommendations from the skills, patterns, and questions you shared.</p></div>
          </div>
        </div>
      </div>
    );
  }

  const titles = [
    ['Start with what you have', 'A resume is helpful, but not required. Give Carin one honest signal to work with.'],
    ['Name the tools you trust', 'Choose the skills you would actually put your hand up for — not the ones you think sound good.'],
    ['Add the context', 'Your classes and interests help us understand where a role might matter to you.'],
    ['Your first direction is ready', 'Carin will turn these signals into a set of roles, gaps, and experiments made for your next month.'],
  ];

  return (
    <div className="onboarding-wrap noise">
      <div className="container-narrow">
        <div className="onboarding-top">
          <Brand />
          <small>Step {step} of {totalSteps}</small>
        </div>
        <div className="progress-track" aria-label={`Onboarding progress ${step} of ${totalSteps}`}><i style={{ width: `${(step / totalSteps) * 100}%` }} /></div>
        <main className="onboarding-card">
          <div className="eyebrow">Your Carin profile</div>
          <h1>{titles[step - 1][0]}</h1>
          <p>{titles[step - 1][1]}</p>
          <div className="step-body">
            {step === 1 && (
              <>
                <div className="mode-tabs" role="tablist">
                  <button className={`mode-tab ${mode === 'upload' ? 'active' : ''}`} onClick={() => setMode('upload')} role="tab" aria-selected={mode === 'upload'} data-testid="button-mode-upload"><Upload size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />Upload resume</button>
                  <button className={`mode-tab ${mode === 'paste' ? 'active' : ''}`} onClick={() => setMode('paste')} role="tab" aria-selected={mode === 'paste'} data-testid="button-mode-paste"><FileText size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />Paste text</button>
                </div>
                {mode === 'upload' ? (
                  <label className="upload-box" data-testid="input-resume-upload">
                    <input type="file" accept=".pdf,.doc,.docx,.txt" style={{ display: 'none' }} onChange={(event) => { if (event.target.files?.[0]) { setResumeSelected(true); updateProfile({ resume: event.target.files[0].name }); } }} />
                    {resumeSelected ? <div className="upload-success"><CheckCircle2 size={22} /><span><strong>{profile.resume || 'maya-chen-resume.pdf'}</strong><br />Ready to read · choose another file</span></div> : <div><Upload size={24} /><strong>Drop your resume here</strong><span>PDF, DOCX, or TXT · under 10MB</span></div>}
                  </label>
                ) : (
                  <textarea className="text-area" value={pasted} onChange={(event) => { setPasted(event.target.value); updateProfile({ resume: event.target.value.trim() || null }); }} placeholder="Maya Chen — Cognitive Science student..." data-testid="input-resume-paste" />
                )}
                <div className="input-help">Carin only uses this to build your sample path. You can edit anything before you continue.</div>
              </>
            )}
            {step === 2 && (
              <>
                <label className="input-label">Skills you want to carry forward</label>
                <div className="chip-cloud">{skillChoices.map((skill) => <button key={skill} className={`skill-chip ${profile.skills.includes(skill) ? 'selected' : ''}`} onClick={() => updateProfile({ skills: profile.skills.includes(skill) ? profile.skills.filter((item) => item !== skill) : [...profile.skills, skill] })} data-testid={`button-skill-${skill.toLowerCase().replaceAll(' ', '-')}`}>{profile.skills.includes(skill) && <Check size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} />}{skill}</button>)}</div>
                <div className="input-help">Pick at least two. You can change these later.</div>
              </>
            )}
            {step === 3 && (
              <>
                <label className="input-label" htmlFor="degree">What are you studying?</label>
                <input className="text-input" id="degree" value={profile.degree} onChange={(event) => updateProfile({ degree: event.target.value })} placeholder="B.A. Cognitive Science" data-testid="input-degree" />
                <label className="input-label" htmlFor="school" style={{ marginTop: 22 }}>Where are you learning?</label>
                <input className="text-input" id="school" value={profile.school} onChange={(event) => updateProfile({ school: event.target.value })} placeholder="University of Washington" data-testid="input-school" />
                <label className="input-label" style={{ marginTop: 22 }}>What pulls at your attention?</label>
                <div className="chip-cloud" style={{ marginTop: 12 }}>{interestChoices.map((interest) => <button key={interest} className={`skill-chip ${profile.interests.includes(interest) ? 'selected' : ''}`} onClick={() => updateProfile({ interests: profile.interests.includes(interest) ? profile.interests.filter((item) => item !== interest) : [...profile.interests, interest] })} data-testid={`button-interest-${interest.toLowerCase().replaceAll(' ', '-')}`}>{interest}</button>)}</div>
              </>
            )}
            {step === 4 && (
              <div className="panel" style={{ background: 'hsl(43 75% 68% / .25)', borderColor: 'hsl(43 75% 68%)' }}>
                <div className="panel-header"><div><div className="panel-title">{profile.name}'s first signal</div><div className="panel-subtitle">A thoughtful mix of people skills, technical curiosity, and a bias toward useful work.</div></div><Sparkles size={23} color="hsl(13 71% 56%)" /></div>
                <div className="teaser-list">
                  <div className="teaser-row" style={{ background: 'hsl(45 36% 97% / .65)' }}><div><strong>Best starting territory</strong><small>Product research + climate technology</small></div><Target size={17} /></div>
                  <div className="teaser-row" style={{ background: 'hsl(45 36% 97% / .65)' }}><div><strong>First gap to close</strong><small>Experiment design with real users</small></div><Lightbulb size={17} /></div>
                </div>
              </div>
            )}
          </div>
          {submitError && <p role="alert" className="input-help" style={{ color: 'hsl(13 71% 46%)', marginTop: 18 }}>{submitError}</p>}
          <div className="onboarding-actions">
            {step > 1 ? <button className="back-button" onClick={() => setStep(step - 1)} data-testid="button-onboarding-back"><ChevronLeft size={15} style={{ verticalAlign: 'middle' }} /> Back</button> : <button className="back-button" onClick={restart} data-testid="button-onboarding-exit">Start over</button>}
            {step < totalSteps ? <button className="button-ink" disabled={!canContinue} onClick={() => setStep(step + 1)} data-testid="button-onboarding-next">Continue</button> : <button className="button-primary" onClick={buildPath} disabled={createProfile.isPending} data-testid="button-build-path">Build my path</button>}
          </div>
        </main>
      </div>
    </div>
  );
}

type ModuleId = 'matches' | 'skills' | 'roadmap' | 'projects' | 'interview';

const moduleItems: { id: ModuleId; label: string; Icon: typeof Target }[] = [
  { id: 'matches', label: 'Career matches', Icon: Target },
  { id: 'skills', label: 'Skill gaps', Icon: BrainCircuit },
  { id: 'roadmap', label: 'Learning roadmap', Icon: BookOpen },
  { id: 'projects', label: 'Recommended projects', Icon: Code2 },
  { id: 'interview', label: 'Interview prep', Icon: ListChecks },
];

const matches = [
  { role: 'Product Researcher', company: 'Consumer technology · people-first', score: 84, reason: 'Your user research and cognitive science background point to strong pattern-spotting. Add experiment design to make the story more complete.' },
  { role: 'Climate Data Analyst', company: 'Climate technology · evidence-led', score: 68, reason: 'Your SQL foundation is useful here. The stretch is stronger statistics and learning how to explain a model to non-technical teammates.' },
  { role: 'UX Content Strategist', company: 'Digital products · clarity obsessed', score: 79, reason: 'You already translate complexity for people. Build a small content system to show how you think beyond a single screen.' },
];

const projects = [
  { id: 'heatmap', name: 'The Bus Stop Heat Map', detail: 'Map cooling access across Seattle neighborhoods', skills: 'Python · data viz', time: '6–8 hours', level: 'Warm-up' },
  { id: 'interview', name: 'Five Conversations, One Pattern', detail: 'Find the friction inside a campus service', skills: 'Research · synthesis', time: '4–5 hours', level: 'Best next' },
  { id: 'content', name: 'The Plain-Language Rewrite', detail: 'Turn a complex climate report into a useful guide', skills: 'Writing · systems', time: '3 hours', level: 'Quick win' },
];

function Dashboard({ data, editProfile, onDataChange }: { data: CareerDashboard; editProfile: () => void; onDataChange: (dashboard: CareerDashboard) => void }) {
  const [active, setActive] = useState<ModuleId>('matches');
  const [savedProjects, setSavedProjects] = useState<string[]>(data.savedProjects);
  const [completed, setCompleted] = useState<string[]>(data.completedPrep);
  const [progressError, setProgressError] = useState('');
  const profile = data.profile;
  const progressMutation = useUpdateCareerProgress();
  const completedRef = useRef(completed);
  const savedProjectsRef = useRef(savedProjects);
  const progressQueueRef = useRef<{ completedPrep: string[]; savedProjects: string[] } | null>(null);
  const progressRequestActiveRef = useRef(false);

  const flushProgressQueue = () => {
    if (progressRequestActiveRef.current || !progressQueueRef.current) return;

    const nextProgress = progressQueueRef.current;
    progressQueueRef.current = null;
    progressRequestActiveRef.current = true;
    progressMutation.mutate(
      { profileId: data.id, data: nextProgress },
      {
        onSuccess: (nextDashboard: CareerDashboard) => {
          onDataChange(nextDashboard);
          progressRequestActiveRef.current = false;
          flushProgressQueue();
        },
        onError: () => {
          setProgressError('Progress could not be saved. Your local changes are still visible.');
          progressRequestActiveRef.current = false;
          flushProgressQueue();
        },
      },
    );
  };

  const persistProgress = (nextCompleted: string[], nextSaved: string[]) => {
    completedRef.current = nextCompleted;
    savedProjectsRef.current = nextSaved;
    progressQueueRef.current = { completedPrep: nextCompleted, savedProjects: nextSaved };
    setProgressError('');
    flushProgressQueue();
  };

  const toggleSaved = (id: string) => {
    const nextSaved = savedProjectsRef.current.includes(id)
      ? savedProjectsRef.current.filter((item) => item !== id)
      : [...savedProjectsRef.current, id];
    setSavedProjects(nextSaved);
    persistProgress(completedRef.current, nextSaved);
  };
  const toggleCompleted = (id: string) => {
    const nextCompleted = completedRef.current.includes(id)
      ? completedRef.current.filter((item) => item !== id)
      : [...completedRef.current, id];
    setCompleted(nextCompleted);
    persistProgress(nextCompleted, savedProjectsRef.current);
  };
  const activeItem = moduleItems.find((item) => item.id === active) ?? moduleItems[0];

  const renderMatches = () => (
    <div className="dash-grid">
      <section className="panel">
        <div className="panel-header"><div><div className="panel-title">Roles with a signal</div><div className="panel-subtitle">Ordered by the overlap between what you know, what you value, and what you could learn next.</div></div><span className="tiny-label">3 MATCHES</span></div>
        <div className="match-list">{data.matches.map((match) => <div className="match-item" key={match.role} data-testid={`card-match-${match.role.toLowerCase().replaceAll(' ', '-')}`}><div><strong>{match.role}</strong><p>{match.company}</p><p>{match.reason}</p></div><div className={`match-score ${match.score < 75 ? 'medium' : ''}`} data-testid={`text-fit-score-${match.score}`}>{match.score}</div></div>)}</div>
      </section>
      <section className="panel">
          <div className="panel-header"><div><div className="panel-title">What is carrying you</div><div className="panel-subtitle">Your current signal against the {data.matches[0]?.role ?? 'top role'} profile.</div></div><CircleUserRound size={21} color="hsl(179 45% 31%)" /></div>
        <div className="metric-stack">
            {data.skillGaps.slice(0, 3).map((gap) => <div className="metric-row" key={gap.name}><header><span>{gap.name}</span><span>{gap.current} / 100</span></header><div className="metric-bar"><i style={{ width: `${gap.current}%` }} /></div></div>)}
        </div>
        <div className="gap-note"><strong>Good news:</strong> you do not need to become an engineer. A focused SQL + experiment design project would move your profile meaningfully.</div>
      </section>
      <section className="panel roadmap-panel">
        <div className="panel-header"><div><div className="panel-title">Your first four weeks</div><div className="panel-subtitle">A compact route from “interested” to “I can show you what I made.”</div></div><button className="button-quiet button-small" onClick={() => setActive('roadmap')} data-testid="button-view-roadmap">View full roadmap</button></div>
        <div className="roadmap">
          <div className="road-step current"><time>WEEK 01</time><h4>Find the pattern</h4><p>Run five interviews around one campus friction.</p></div>
          <div className="road-step"><time>WEEK 02</time><h4>Make it legible</h4><p>Learn the SQL joins behind a clean evidence set.</p></div>
          <div className="road-step"><time>WEEK 03</time><h4>Test a hunch</h4><p>Design a lightweight experiment and read the result.</p></div>
          <div className="road-step"><time>WEEK 04</time><h4>Tell the story</h4><p>Turn your work into a portfolio case study.</p></div>
        </div>
      </section>
      <section className="panel">
        <div className="panel-header"><div><div className="panel-title">Saved experiments</div><div className="panel-subtitle">Keep the ones that make you curious.</div></div><span className="tiny-label">{savedProjects.length} SAVED</span></div>
        {savedProjects.length ? <div className="project-list">{data.projects.filter((project) => savedProjects.includes(project.id)).map((project) => <div className="project-item" key={project.id}><div><strong>{project.name}</strong><p>{project.time}</p></div><CheckCircle2 size={17} color="hsl(179 45% 31%)" /></div>)}</div> : <div className="empty-state"><strong>Nothing saved yet</strong><p>Save a project from the recommendations when one feels like a good Saturday.</p></div>}
      </section>
      <section className="role-strip"><div><h3>Not ready to commit to one role?</h3><p>That is information too. Compare adjacent paths without starting over.</p></div><div className="role-tags"><span className="role-tag">UX Research</span><span className="role-tag">Product Ops</span><span className="role-tag">Impact Analytics</span></div></section>
    </div>
  );

  const renderSkills = () => (
    <div className="dash-grid">
      <section className="panel" style={{ gridColumn: '1 / -1' }}>
        <div className="panel-header"><div><div className="panel-title">The gap is a map, not a verdict</div><div className="panel-subtitle">Here is how your current signal compares with the Product Researcher roles we found.</div></div><span className="tiny-label">CURRENT / REQUIRED</span></div>
        <div className="metric-stack" style={{ maxWidth: 780 }}>
          {data.skillGaps.map((gap) => <div className="metric-row" key={gap.name}><header><span>{gap.name}</span><span>{gap.current} / {gap.required}</span></header><div className="metric-bar" style={{ background: `linear-gradient(to right, hsl(179 45% 31%) ${gap.current}%, hsl(42 19% 88%) ${gap.current}%)` }}><i style={{ width: `${gap.required}%`, background: 'hsl(13 71% 56% / .5)', mixBlendMode: 'multiply' }} /></div><div className="tiny-label" style={{ marginTop: 5 }}>Your level <span style={{ color: 'hsl(179 45% 31%)' }}>{gap.current}</span> · role signal <span style={{ color: 'hsl(13 71% 56%)' }}>{gap.required}</span></div></div>)}
        </div>
        <div className="gap-note" style={{ maxWidth: 780, marginTop: 30 }}><strong>Focus for the next 10 days:</strong> experiment design. You can practice it in a small project before taking another course.</div>
      </section>
      <section className="panel"><div className="panel-header"><div><div className="panel-title">Useful courses</div><div className="panel-subtitle">Short, specific, and attached to a reason.</div></div><BookOpen size={20} color="hsl(13 71% 56%)" /></div><div className="project-list"><div className="project-item"><div><strong>Experimentation for Product Teams</strong><p>Reforge · 2h 20m · guided</p></div><Plus size={16} /></div><div className="project-item"><div><strong>SQL for Product Analytics</strong><p>Mode · 3h 10m · interactive</p></div><Plus size={16} /></div><div className="project-item"><div><strong>The Mom Test, applied</strong><p>Carin notes · 35m · read</p></div><Plus size={16} /></div></div></section>
      <section className="panel"><div className="panel-header"><div><div className="panel-title">Already yours</div><div className="panel-subtitle">These are not gaps. They are your leverage.</div></div><CheckCircle2 size={20} color="hsl(179 45% 31%)" /></div><div className="chip-cloud" style={{ marginTop: 0 }}>{profile.skills.map((skill) => <span className="skill-chip selected" key={skill}>{skill}</span>)}</div></section>
    </div>
  );

  const renderRoadmap = () => (
    <div className="dash-grid">
      <section className="panel roadmap-panel">
        <div className="panel-header"><div><div className="panel-title">The Product Researcher route</div><div className="panel-subtitle">One month, one portfolio story, a more informed next decision.</div></div><span className="tiny-label">4 WEEKS</span></div>
        <div className="roadmap" style={{ gridTemplateColumns: '1fr' }}>
          {data.roadmap.map((item, index) => <div className={`road-step ${index === 0 ? 'current' : ''}`} style={{ padding: '18px 0 20px 23px', borderTop: index === 0 ? '2px solid hsl(13 71% 56%)' : '2px solid hsl(42 19% 82%)' }} key={item.week}><time>{item.week}</time><h4>{item.title}</h4><p>{item.detail}</p><span className="teaser-pill">{index === 0 ? 'Start here' : index === 1 ? 'Practice' : index === 2 ? 'Apply' : 'Share'}</span></div>)}
        </div>
      </section>
      <section className="panel"><div className="panel-header"><div><div className="panel-title">Keep it light</div><div className="panel-subtitle">The goal is evidence, not a second degree.</div></div><Lightbulb size={20} color="hsl(13 71% 56%)" /></div><p style={{ color: 'hsl(var(--muted-foreground))', fontSize: 14, lineHeight: 1.55 }}>Give this route 3–4 hours per week. If an activity makes you want to keep going, that is a stronger signal than finishing it perfectly.</p></section>
    </div>
  );

  const renderProjects = () => (
    <div className="dash-grid">
       <section className="panel roadmap-panel"><div className="panel-header"><div><div className="panel-title">Projects you can actually finish</div><div className="panel-subtitle">Small enough for a weekend. Concrete enough for a portfolio conversation.</div></div><span className="tiny-label">{data.projects.length} IDEAS</span></div><div className="project-list">{data.projects.map((project) => <div className="project-item" key={project.id} style={{ padding: '17px 0' }}><div><span className="teaser-pill">{project.level} · {project.skills}</span><strong style={{ display: 'block', marginTop: 7 }}>{project.name}</strong><p>{project.detail}</p></div><div style={{ textAlign: 'right' }}><div className="project-meta">{project.time}</div><button className={`project-save ${savedProjects.includes(project.id) ? 'saved' : ''}`} onClick={() => toggleSaved(project.id)} data-testid={`button-save-project-${project.id}`}>{savedProjects.includes(project.id) ? 'Saved' : 'Save project'}</button></div></div>)}</div></section>
       <section className="panel"><div className="panel-header"><div><div className="panel-title">Saved for later</div><div className="panel-subtitle">A low-pressure shelf for future-you.</div></div></div>{savedProjects.length ? <div className="project-list">{data.projects.filter((project) => savedProjects.includes(project.id)).map((project) => <div className="project-item" key={project.id}><div><strong>{project.name}</strong><p>{project.time}</p></div><button className="project-save" onClick={() => toggleSaved(project.id)} data-testid={`button-remove-project-${project.id}`}>Remove</button></div>)}</div> : <div className="empty-state"><strong>Your shelf is clear</strong><p>Save anything that gives you a small spark. No commitment attached.</p></div>}</section>
    </div>
  );

  const renderInterview = () => (
    <div className="dash-grid">
      <section className="panel"><div className="panel-header"><div><div className="panel-title">Ready when the conversation starts</div><div className="panel-subtitle">A calm checklist for the {data.matches[0]?.role ?? 'role'} loop.</div></div><span className="tiny-label">{completed.length} / {data.interviewChecklist.length} DONE</span></div><div className="prep-list">{data.interviewChecklist.map((item) => <button className={`prep-row ${completed.includes(item.id) ? 'done' : ''}`} key={item.id} onClick={() => toggleCompleted(item.id)} data-testid={`button-prep-${item.id}`}><span className="prep-check">{completed.includes(item.id) && <Check size={12} />}</span><span><strong>{item.title}</strong><p>{item.detail}</p></span></button>)}</div></section>
      <section className="panel"><div className="panel-header"><div><div className="panel-title">Roles adjacent to your path</div><div className="panel-subtitle">Good places to look while you build evidence.</div></div><BriefcaseBusiness size={20} color="hsl(179 45% 31%)" /></div><div className="match-list">{data.jobRoles.map((item) => <div className="match-item" key={item.role}><div><strong>{item.role}</strong><p>{item.detail}</p></div><span className="teaser-pill">Explore</span></div>)}</div></section>
      <section className="role-strip"><div><h3>One thing to remember</h3><p>You are not trying to prove you have done the job. You are showing how you learn the job.</p></div><button className="button-primary" onClick={() => setActive('projects')} data-testid="button-practice-project">Pick a project</button></section>
    </div>
  );

  const content = active === 'matches' ? renderMatches() : active === 'skills' ? renderSkills() : active === 'roadmap' ? renderRoadmap() : active === 'projects' ? renderProjects() : renderInterview();

  return (
    <div className="dashboard noise">
      <aside className="dash-sidebar">
        <Brand dark />
        <nav className="dash-nav" aria-label="Dashboard modules">{moduleItems.map((item) => <button className={active === item.id ? 'active' : ''} key={item.id} onClick={() => setActive(item.id)} data-testid={`button-module-${item.id}`}><item.Icon />{item.label}</button>)}</nav>
        <div className="dash-profile"><small>YOUR PROFILE</small><strong>{profile.name}</strong><br /><span style={{ color: 'hsl(45 36% 97% / .55)', fontSize: 12 }}>{profile.degree}</span><button onClick={editProfile} data-testid="button-edit-profile"><Pencil size={12} style={{ verticalAlign: 'middle', marginRight: 5 }} />Edit profile</button></div>
        <button className="back-button" style={{ color: 'hsl(45 36% 97% / .55)', textAlign: 'left', padding: '8px 14px' }} onClick={editProfile} data-testid="button-dashboard-restart"><RotateCcw size={14} style={{ verticalAlign: 'middle', marginRight: 7 }} />Restart path</button>
      </aside>
      <main className="dash-main">
         <div className="dash-topbar"><small>YOUR CARIN PATH / {progressMutation.isPending ? 'SYNCING PROGRESS' : progressError ? 'OFFLINE DRAFT' : 'SAVED'}</small><div className="dash-topbar-right"><button className="button-quiet button-small" onClick={editProfile} data-testid="button-edit-profile-top">Edit profile</button><div className="avatar" data-testid="text-profile-initials">{profile.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div></div></div>
        <div className="dashboard-heading"><div><div className="eyebrow">Good morning, {profile.name.split(' ')[0]}</div><h1>{activeItem.label}</h1></div><p>{active === 'matches' ? 'A grounded shortlist for a decision that is allowed to stay open.' : active === 'skills' ? 'See what to practice next, without turning every gap into a crisis.' : active === 'roadmap' ? 'A small route that gives your curiosity somewhere to go.' : active === 'projects' ? 'Proof beats potential. Pick a thing you can make and explain.' : 'Prepare the story underneath the bullet points.'}</p></div>
         {progressError && <p role="status" className="input-help" style={{ color: 'hsl(13 71% 46%)', marginBottom: 16 }}>{progressError}</p>}
        {content}
      </main>
    </div>
  );
}

function Router() {
  const [location, setLocation] = useLocation();
  const [profile, setProfile] = useState<Profile>(starterProfile);
  const [started, setStarted] = useState(false);
  const [dashboard, setDashboard] = useState<CareerDashboard | null>(null);
  const [profileId, setProfileId] = useState<string | null>(() => window.localStorage.getItem('carin-profile-id'));
  const savedProfile = useGetCareerProfile(profileId ?? '', {
    query: { enabled: Boolean(profileId), queryKey: getGetCareerProfileQueryKey(profileId ?? '') },
  });

  const begin = () => { setStarted(true); setLocation('/onboarding'); };
  const finish = (nextDashboard: CareerDashboard) => {
    setDashboard(nextDashboard);
    setProfile(nextDashboard.profile);
    setProfileId(nextDashboard.id);
    window.localStorage.setItem('carin-profile-id', nextDashboard.id);
    setStarted(true);
    setLocation('/dashboard');
  };
  const editProfile = () => { setStarted(true); setLocation('/onboarding'); };
  const restart = () => {
    setStarted(false);
    setDashboard(null);
    setProfile(starterProfile);
    setProfileId(null);
    window.localStorage.removeItem('carin-profile-id');
    setLocation('/');
  };

  if (location === '/onboarding') return <Onboarding profile={profile} setProfile={setProfile} onCreated={finish} restart={restart} />;
  if (location === '/dashboard') {
    const currentDashboard = dashboard ?? savedProfile.data;
    if (currentDashboard) {
      return <Dashboard data={currentDashboard} editProfile={editProfile} onDataChange={(nextDashboard) => {
        setDashboard(nextDashboard);
        setProfile(nextDashboard.profile);
      }} />;
    }
    if (savedProfile.isLoading) {
      return <div className="onboarding-wrap noise"><div className="parse-state"><div><div className="parse-orbit" /><h2>Loading your path.</h2><p>Fetching the profile and recommendations you saved last time.</p></div></div></div>;
    }
    return <div className="onboarding-wrap noise"><div className="container-narrow"><main className="onboarding-card"><div className="eyebrow">Your path is waiting</div><h1>Build a profile to see recommendations.</h1><p>Start with a few signals and Carin will turn them into roles, gaps, projects, and a plan you can revisit.</p><button className="button-primary" onClick={begin}>Build my path</button></main></div></div>;
  }
  if (location === '/' || !started) return <Landing begin={begin} />;
  return <NotFound />;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <RoutedErrorBoundary>
            <Switch>
              <Route path="/onboarding"><Router /></Route>
              <Route path="/dashboard"><Router /></Route>
              <Route path="/"><Router /></Route>
              <Route component={NotFound} />
            </Switch>
          </RoutedErrorBoundary>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;