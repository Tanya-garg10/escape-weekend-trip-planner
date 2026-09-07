import { Sliders, Sparkles, Compass } from 'lucide-react';

const STEPS = [
    {
        num: '01',
        icon: Sliders,
        title: 'Tell us your vibe',
        desc: 'Choose your budget, travel time, and preferred experience — beach, mountains, culture, or just a quiet escape.',
    },
    {
        num: '02',
        icon: Sparkles,
        title: 'Discover your match',
        desc: 'ESCAPE compares destinations against your preferences and surfaces the options that fit you best.',
    },
    {
        num: '03',
        icon: Compass,
        title: 'Pick & go',
        desc: 'Explore a full 2-day itinerary, save your favourites, and head out for the weekend you deserve.',
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 px-4" style={{ background: 'hsl(215,35%,12%)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <p
                        className="text-xs font-semibold uppercase tracking-widest mb-3"
                        style={{ color: 'hsl(34,90%,65%)' }}
                    >
                        Simple by design
                    </p>
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-white"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        How it works
                    </h2>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {STEPS.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={step.num}
                                className="relative p-6 rounded-2xl"
                                style={{
                                    background: 'hsla(215,35%,20%,0.5)',
                                    border: '1px solid hsla(215,35%,35%,0.3)',
                                }}
                            >
                                {/* Connector line (desktop) */}
                                {i < STEPS.length - 1 && (
                                    <div
                                        className="hidden md:block absolute top-10 right-0 w-8 h-px translate-x-full"
                                        style={{ background: 'hsla(34,78%,48%,0.4)' }}
                                    />
                                )}

                                <div className="flex items-start gap-4">
                                    {/* Number */}
                                    <div
                                        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                                        style={{ background: 'hsla(34,78%,48%,0.15)', color: 'hsl(34,90%,65%)' }}
                                    >
                                        {step.num}
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Icon size={16} style={{ color: 'hsl(34,90%,65%)' }} />
                                            <h3 className="text-base font-semibold text-white">{step.title}</h3>
                                        </div>
                                        <p className="text-sm leading-relaxed" style={{ color: 'hsl(215,15%,65%)' }}>
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
