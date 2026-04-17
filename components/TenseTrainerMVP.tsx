"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    XCircle,
    RotateCcw,
    BookOpen,
    Swords,
    Wrench,
    Brain
} from "lucide-react";
import {
    questionBank,
    tenseMeta,
    buildQuestions,
    emptyTenseProgress,
    type TenseKey
} from "@/data/tenseQuestions";

type Stats = {
    correct: number;
    wrong: number;
    streak: number;
    total: number;
};

type SavedState = {
    mode: "practice" | "battle" | "build" | "guide";
    selectedTense: TenseKey;
    stats: Stats;
    statsByTense: typeof emptyTenseProgress;
};

const STORAGE_KEY = "tense-trainer-v2";

const flattenQuestions = Object.entries(questionBank).flatMap(([tense, items]) =>
    items.map((item) => ({ ...item, tense: tense as TenseKey }))
);

function shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}
function normalizeText(text: string) {
    return text
        .trim()
        .toLowerCase()
        .replace(/[.,!?]/g, "")
        .replace(/\s+/g, " ");
}
function Card({
    children,
    className = ""
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>
            {children}
        </div>
    );
}

function Button({
    children,
    className = "",
    variant = "primary",
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const styles =
        variant === "outline"
            ? "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
            : "bg-slate-900 text-white hover:bg-slate-800";

    return (
        <button
            className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition ${styles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

function ProgressBar({ value }: { value: number }) {
    return (
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
            <div
                className="h-full rounded-full bg-slate-900 transition-all"
                style={{ width: `${value}%` }}
            />
        </div>
    );
}

export default function TenseTrainerMVP() {
    const [hydrated, setHydrated] = useState(false);
    const [mode, setMode] = useState<"practice" | "battle" | "build" | "guide">("practice");
    const [selectedTense, setSelectedTense] = useState<TenseKey>("present_simple");
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [writtenAnswer, setWrittenAnswer] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [stats, setStats] = useState<Stats>({
        correct: 0,
        wrong: 0,
        streak: 0,
        total: 0
    });
    const [statsByTense, setStatsByTense] = useState(emptyTenseProgress);
    const [battleDeck, setBattleDeck] = useState(() => shuffle(flattenQuestions).slice(0, 8));
    const [battleIndex, setBattleIndex] = useState(0);
    const [battleDone, setBattleDone] = useState(false);
    const [buildIndex, setBuildIndex] = useState(0);

    const practiceQuestions = useMemo(() => questionBank[selectedTense], [selectedTense]);
    const currentQuestion = practiceQuestions[questionIndex];
    const battleQuestion = battleDeck[battleIndex];
    const buildSet = useMemo(() => buildQuestions[selectedTense], [selectedTense]);
    const currentBuildQuestion = buildSet[buildIndex];
    const accuracy = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed: SavedState = JSON.parse(raw);
                if (parsed.mode) setMode(parsed.mode);
                if (parsed.selectedTense) setSelectedTense(parsed.selectedTense);
                if (parsed.stats) setStats(parsed.stats);
                if (parsed.statsByTense) setStatsByTense(parsed.statsByTense);
            }
        } catch (error) {
            console.error("Failed to read localStorage:", error);
        } finally {
            setHydrated(true);
        }
    }, []);

    useEffect(() => {
        if (!hydrated) return;

        const payload: SavedState = {
            mode,
            selectedTense,
            stats,
            statsByTense
        };

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch (error) {
            console.error("Failed to save localStorage:", error);
        }
    }, [hydrated, mode, selectedTense, stats, statsByTense]);

    const resetInput = () => {
        setSelectedOption("");
        setWrittenAnswer("");
        setShowResult(false);
    };

    const moveNextPractice = () => {
        resetInput();
        setQuestionIndex((prev) => (prev + 1) % practiceQuestions.length);
    };

    const updateStats = (isCorrect: boolean, tense: TenseKey) => {
        setStats((prev) => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            wrong: prev.wrong + (isCorrect ? 0 : 1),
            streak: isCorrect ? prev.streak + 1 : 0,
            total: prev.total + 1
        }));

        setStatsByTense((prev) => ({
            ...prev,
            [tense]: {
                correct: prev[tense].correct + (isCorrect ? 1 : 0),
                wrong: prev[tense].wrong + (isCorrect ? 0 : 1),
                total: prev[tense].total + 1
            }
        }));
    };

    const checkPractice = () => {
        const userValue =
            currentQuestion.type === "mcq" ? selectedOption : writtenAnswer.trim();

        if (!userValue) return;

        const isCorrect =
            userValue.toLowerCase() === currentQuestion.answer.toLowerCase();

        updateStats(isCorrect, selectedTense);
        setShowResult(true);
    };
    const checkBuild = () => {
        const userValue = writtenAnswer.trim();
        if (!userValue) return;

        const isCorrect =
            normalizeText(userValue) === normalizeText(currentBuildQuestion.sampleAnswer);

        updateStats(isCorrect, selectedTense);
        setShowResult(true);
    };

    const nextBuildQuestion = () => {
        resetInput();
        setBuildIndex((prev) => (prev + 1) % buildSet.length);
    };
    const checkBattle = (value: string) => {
        const isCorrect =
            value.toLowerCase() === battleQuestion.answer.toLowerCase();

        updateStats(isCorrect, battleQuestion.tense);

        if (battleIndex === battleDeck.length - 1) {
            setBattleDone(true);
        } else {
            setBattleIndex((prev) => prev + 1);
        }
    };

    const restartBattle = () => {
        setBattleDeck(shuffle(flattenQuestions).slice(0, 8));
        setBattleIndex(0);
        setBattleDone(false);
        setWrittenAnswer("");
    };

    const resetAll = () => {
        setStats({ correct: 0, wrong: 0, streak: 0, total: 0 });
        setStatsByTense(emptyTenseProgress);
        setQuestionIndex(0);
        restartBattle();
        resetInput();
        setMode("practice");
        setSelectedTense("present_simple");
        localStorage.removeItem(STORAGE_KEY);
    };

    if (!hydrated) {
        return (
            <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
                <div className="mx-auto max-w-4xl">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="text-lg font-semibold">Đang tải dữ liệu học...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 text-slate-900 md:p-8">
            <div className="mx-auto max-w-6xl space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid gap-4 md:grid-cols-[1.5fr_1fr]"
                >
                    <Card>
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Brain className="h-4 w-4" />
                                Beginner English Trainer
                            </div>
                            <h1 className="mt-2 text-3xl font-bold">Tense Trainer MVP v2</h1>
                            <p className="mt-2 text-base leading-6 text-slate-600">
                                Luyện thì tiếng Anh theo kiểu dễ nuốt: làm câu nhanh, sửa lỗi, và bám
                                theo tín hiệu như <b>now</b>, <b>yesterday</b>, <b>since</b>.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {Object.entries(tenseMeta).map(([key, value]) => (
                                    <span
                                        key={key}
                                        className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                                    >
                                        {value.title}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold">Tiến độ</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Theo dõi độ ổn định của người học
                            </p>
                            <div className="mt-4">
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span>Accuracy</span>
                                    <span>{accuracy}%</span>
                                </div>
                                <ProgressBar value={accuracy} />
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="text-slate-500">Đúng</div>
                                    <div className="mt-1 text-2xl font-semibold">{stats.correct}</div>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="text-slate-500">Sai</div>
                                    <div className="mt-1 text-2xl font-semibold">{stats.wrong}</div>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="text-slate-500">Chuỗi đúng</div>
                                    <div className="mt-1 text-2xl font-semibold">{stats.streak}</div>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="text-slate-500">Tổng câu</div>
                                    <div className="mt-1 text-2xl font-semibold">{stats.total}</div>
                                </div>
                            </div>
                            <Button variant="outline" className="mt-4 w-full" onClick={resetAll}>
                                <RotateCcw className="h-4 w-4" /> Reset tiến độ
                            </Button>
                        </div>
                    </Card>
                </motion.div>

                <div className="grid w-full grid-cols-3 rounded-3xl border border-slate-200 bg-white p-1 shadow-sm">
                    {[
                        { key: "practice", label: "Practice", icon: BookOpen },
                        { key: "battle", label: "Battle", icon: Swords },
                        { key: "build", label: "Build", icon: Brain },
                        { key: "guide", label: "Guide", icon: Wrench }
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setMode(tab.key as "practice" | "battle" | "build" | "guide")}
                                className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition ${mode === tab.key
                                    ? "bg-slate-900 text-white"
                                    : "text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                <Icon className="h-4 w-4" /> {tab.label}
                            </button>
                        );
                    })}
                </div>

                {mode === "practice" && (
                    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                        <Card>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold">Chọn thì</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Cho người mới học theo từng cụm nhỏ
                                </p>
                                <div className="mt-4 space-y-3">
                                    {Object.entries(tenseMeta).map(([key, meta]) => (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                setSelectedTense(key as TenseKey);
                                                setQuestionIndex(0);
                                                resetInput();
                                            }}
                                            className={`w-full rounded-2xl border p-4 text-left transition ${selectedTense === key
                                                ? "border-slate-900 bg-slate-900 text-white"
                                                : "border-slate-200 bg-white hover:bg-slate-50"
                                                }`}
                                        >
                                            <div className="font-semibold">{meta.title}</div>
                                            <div
                                                className={`mt-1 text-sm ${selectedTense === key ? "text-slate-200" : "text-slate-500"
                                                    }`}
                                            >
                                                Dấu hiệu: {meta.signal.join(", ")}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${selectedTense}-${questionIndex}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <Card>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <h2 className="text-2xl font-semibold">
                                                    {tenseMeta[selectedTense].title}
                                                </h2>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Câu {questionIndex + 1}/{practiceQuestions.length} • Hint:{" "}
                                                    <b>{currentQuestion.hint}</b>
                                                </p>
                                            </div>
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                                                {currentQuestion.type === "mcq" ? "Choose" : "Fix"}
                                            </span>
                                        </div>

                                        <div className="mt-5 space-y-5">
                                            {currentQuestion.type === "mcq" ? (
                                                <>
                                                    <div className="rounded-2xl bg-slate-100 p-5 text-xl font-medium">
                                                        {currentQuestion.sentence}
                                                    </div>
                                                    <div className="grid gap-3 md:grid-cols-2">
                                                        {currentQuestion.options.map((option) => (
                                                            <button
                                                                key={option}
                                                                onClick={() => setSelectedOption(option)}
                                                                className={`rounded-2xl border p-4 text-left transition ${selectedOption === option
                                                                    ? "border-slate-900 bg-slate-900 text-white"
                                                                    : "border-slate-200 bg-white hover:bg-slate-50"
                                                                    }`}
                                                            >
                                                                {option}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="rounded-2xl bg-red-50 p-5 text-xl font-medium text-red-700">
                                                        {currentQuestion.wrongSentence}
                                                    </div>
                                                    <input
                                                        value={writtenAnswer}
                                                        onChange={(e) => setWrittenAnswer(e.target.value)}
                                                        placeholder="Nhập câu đúng ở đây..."
                                                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none placeholder:text-slate-400 focus:border-slate-900"
                                                    />
                                                </>
                                            )}

                                            {!showResult ? (
                                                <div className="flex gap-3">
                                                    <Button onClick={checkPractice}>Kiểm tra</Button>
                                                    <Button variant="outline" onClick={moveNextPractice}>
                                                        Bỏ qua
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="rounded-2xl border border-slate-200 p-4">
                                                    {(currentQuestion.type === "mcq"
                                                        ? selectedOption
                                                        : writtenAnswer.trim()
                                                    ).toLowerCase() === currentQuestion.answer.toLowerCase() ? (
                                                        <div className="flex items-start gap-3 text-emerald-700">
                                                            <CheckCircle2 className="mt-0.5 h-5 w-5" />
                                                            <div>
                                                                <div className="font-semibold">Chính xác rồi.</div>
                                                                <div className="mt-1 text-sm">
                                                                    {currentQuestion.explanation}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-3 text-red-700">
                                                            <div className="flex items-start gap-3">
                                                                <XCircle className="mt-0.5 h-5 w-5" />
                                                                <div>
                                                                    <div className="font-semibold">Chưa đúng.</div>
                                                                    <div className="mt-1 text-sm">
                                                                        {currentQuestion.explanation}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="rounded-xl bg-red-50 p-3 text-sm">
                                                                Đáp án đúng: <b>{currentQuestion.answer}</b>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="mt-4 flex gap-3">
                                                        <Button onClick={moveNextPractice}>Câu tiếp theo</Button>
                                                        <Button variant="outline" onClick={resetInput}>
                                                            Làm lại câu này
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

                {mode === "battle" && (
                    <Card>
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold">Battle Mode</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Làm nhanh 8 câu trộn ngẫu nhiên để xem người học đang yếu ở đâu
                            </p>

                            {!battleDone ? (
                                <div className="mt-5 space-y-5">
                                    <div className="flex items-center justify-between">
                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                                            {tenseMeta[battleQuestion.tense].title}
                                        </span>
                                        <div className="text-sm text-slate-500">
                                            {battleIndex + 1}/{battleDeck.length}
                                        </div>
                                    </div>

                                    {battleQuestion.type === "mcq" ? (
                                        <>
                                            <div className="rounded-2xl bg-slate-100 p-5 text-xl font-medium">
                                                {battleQuestion.sentence}
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                Hint: {battleQuestion.hint}
                                            </div>
                                            <div className="grid gap-3 md:grid-cols-2">
                                                {battleQuestion.options.map((option) => (
                                                    <Button
                                                        key={option}
                                                        variant="outline"
                                                        className="justify-start p-4"
                                                        onClick={() => checkBattle(option)}
                                                    >
                                                        {option}
                                                    </Button>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="rounded-2xl bg-red-50 p-5 text-xl font-medium text-red-700">
                                                {battleQuestion.wrongSentence}
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                Hint: {battleQuestion.hint}
                                            </div>
                                            <div className="flex gap-3">
                                                <input
                                                    value={writtenAnswer}
                                                    onChange={(e) => setWrittenAnswer(e.target.value)}
                                                    placeholder="Nhập câu đúng..."
                                                    className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none placeholder:text-slate-400 focus:border-slate-900"
                                                />
                                                <Button
                                                    onClick={() => {
                                                        if (!writtenAnswer.trim()) return;
                                                        checkBattle(writtenAnswer.trim());
                                                        setWrittenAnswer("");
                                                    }}
                                                >
                                                    Submit
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="mt-8 space-y-5 text-center">
                                    <div className="text-4xl font-bold">Xong battle 🎯</div>
                                    <div className="mx-auto max-w-xl text-slate-600">
                                        Accuracy hiện tại là <b>{accuracy}%</b>. Bản này đã đủ ổn để demo
                                        cho beginner dùng thử rồi.
                                    </div>
                                    <div className="flex justify-center gap-3">
                                        <Button onClick={restartBattle}>Chơi lại</Button>
                                        <Button variant="outline" onClick={() => setMode("practice")}>
                                            Quay về Practice
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                )}
                {mode === "build" && (
                    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                        <Card>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold">Chọn thì</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Luyện tự viết câu theo từng thì
                                </p>
                                <div className="mt-4 space-y-3">
                                    {Object.entries(tenseMeta).map(([key, meta]) => (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                setSelectedTense(key as TenseKey);
                                                setBuildIndex(0);
                                                resetInput();
                                            }}
                                            className={`w-full rounded-2xl border p-4 text-left transition ${selectedTense === key
                                                ? "border-slate-900 bg-slate-900 text-white"
                                                : "border-slate-200 bg-white hover:bg-slate-50"
                                                }`}
                                        >
                                            <div className="font-semibold">{meta.title}</div>
                                            <div
                                                className={`mt-1 text-sm ${selectedTense === key ? "text-slate-200" : "text-slate-500"
                                                    }`}
                                            >
                                                Dấu hiệu: {meta.signal.join(", ")}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${selectedTense}-build-${buildIndex}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <Card>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <h2 className="text-2xl font-semibold">
                                                    {tenseMeta[selectedTense].title} - Build Sentence
                                                </h2>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Câu {buildIndex + 1}/{buildSet.length} • Hint:{" "}
                                                    <b>{currentBuildQuestion.hint}</b>
                                                </p>
                                            </div>
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                                                Build
                                            </span>
                                        </div>

                                        <div className="mt-5 space-y-5">
                                            <div className="rounded-2xl bg-slate-100 p-5">
                                                <div className="text-sm text-slate-500">Prompt</div>
                                                <div className="mt-1 text-lg font-medium">
                                                    {currentBuildQuestion.prompt}
                                                </div>
                                            </div>

                                            <div className="rounded-2xl border border-slate-200 p-5">
                                                <div className="text-sm text-slate-500">Keywords</div>
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {currentBuildQuestion.keywords.map((word) => (
                                                        <span
                                                            key={word}
                                                            className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                                                        >
                                                            {word}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <textarea
                                                value={writtenAnswer}
                                                onChange={(e) => setWrittenAnswer(e.target.value)}
                                                placeholder="Viết câu hoàn chỉnh ở đây..."
                                                className="min-h-[120px] w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-slate-900"
                                            />

                                            {!showResult ? (
                                                <div className="flex gap-3">
                                                    <Button onClick={checkBuild}>Kiểm tra</Button>
                                                    <Button variant="outline" onClick={nextBuildQuestion}>
                                                        Bỏ qua
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="rounded-2xl border border-slate-200 p-4">
                                                    {normalizeText(writtenAnswer) ===
                                                        normalizeText(currentBuildQuestion.sampleAnswer) ? (
                                                        <div className="flex items-start gap-3 text-emerald-700">
                                                            <CheckCircle2 className="mt-0.5 h-5 w-5" />
                                                            <div>
                                                                <div className="font-semibold">Câu ổn rồi.</div>
                                                                <div className="mt-1 text-sm">
                                                                    {currentBuildQuestion.explanation}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-3 text-red-700">
                                                            <div className="flex items-start gap-3">
                                                                <XCircle className="mt-0.5 h-5 w-5" />
                                                                <div>
                                                                    <div className="font-semibold">Chưa đúng mẫu.</div>
                                                                    <div className="mt-1 text-sm">
                                                                        {currentBuildQuestion.explanation}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="rounded-xl bg-red-50 p-3 text-sm">
                                                                Câu mẫu: <b>{currentBuildQuestion.sampleAnswer}</b>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="mt-4 flex gap-3">
                                                        <Button onClick={nextBuildQuestion}>Câu tiếp theo</Button>
                                                        <Button variant="outline" onClick={resetInput}>
                                                            Làm lại câu này
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}
                {mode === "guide" && (
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold">App này đang có gì</h2>
                                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                                    <p><b>Practice mode:</b> học theo từng thì riêng.</p>
                                    <p><b>Battle mode:</b> trộn câu ngẫu nhiên để kiểm tra phản xạ.</p>
                                    <p><b>Fix sentence:</b> sửa câu sai, rất hợp kiểu debug mindset.</p>
                                    <p><b>Hint + explanation:</b> giải thích ngắn gọn sau mỗi câu.</p>
                                    <p><b>Progress:</b> có accuracy, streak, đúng/sai.</p>
                                    <p><b>localStorage:</b> refresh trang không mất tiến độ cơ bản.</p>
                                </div>
                                <div className="mt-6">
                                    <h3 className="text-base font-semibold">Tiến độ theo từng thì</h3>
                                    <div className="mt-3 space-y-3">
                                        {Object.entries(tenseMeta).map(([key, meta]) => {
                                            const progress = statsByTense[key as TenseKey];
                                            const percent = progress.total
                                                ? Math.round((progress.correct / progress.total) * 100)
                                                : 0;

                                            return (
                                                <div key={key} className="rounded-2xl border border-slate-200 p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="font-medium">{meta.title}</div>
                                                        <div className="text-sm text-slate-500">{percent}%</div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <ProgressBar value={percent} />
                                                    </div>
                                                    <div className="mt-2 text-sm text-slate-500">
                                                        Đúng: {progress.correct} • Sai: {progress.wrong} • Tổng: {progress.total}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold">Nâng cấp tiếp theo nên làm</h2>
                                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                                    <p>1. Thêm nhiều câu hơn bằng file data riêng.</p>
                                    <p>2. Thêm mode Build Sentence từ keyword.</p>
                                    <p>3. Lưu riêng tiến độ theo từng thì.</p>
                                    <p>4. Thêm timer thật cho reaction mode.</p>
                                    <p>5. Tách câu theo level: easy / medium / hard.</p>
                                    <p>6. Deploy lên Vercel cho bạn của bạn dùng luôn.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}