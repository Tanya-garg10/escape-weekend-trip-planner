import { Sun, Sunset, Moon } from 'lucide-react';

export default function Itinerary({ days }) {
    return (
        <div className="space-y-6">
            {days.map((day) => (
                <div key={day.day}>
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                        style={{ background: 'hsl(34,78%,48%)', color: 'white' }}
                    >
                        Day {day.day}
                    </div>
                    <div className="space-y-3 pl-1">
                        {[
                            { time: 'Morning', icon: Sun, text: day.morning },
                            { time: 'Afternoon', icon: Sunset, text: day.afternoon },
                            { time: 'Evening', icon: Moon, text: day.evening },
                        ].map((slot) => {
                            const Icon = slot.icon;
                            return (
                                <div key={slot.time} className="flex items-start gap-3">
                                    <div
                                        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                                        style={{ background: 'hsl(215,20%,95%)' }}
                                    >
                                        <Icon size={14} style={{ color: 'hsl(34,78%,45%)' }} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'hsl(215,15%,55%)' }}>
                                            {slot.time}
                                        </p>
                                        <p className="text-sm" style={{ color: 'hsl(215,35%,20%)' }}>
                                            {slot.text}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
