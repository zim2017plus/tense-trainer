export type McqQuestion = {
    id: number;
    type: "mcq";
    sentence: string;
    options: string[];
    answer: string;
    hint: string;
    explanation: string;
};

export type FixQuestion = {
    id: number;
    type: "fix";
    wrongSentence: string;
    answer: string;
    hint: string;
    explanation: string;
};

export type BuildQuestion = {
    id: number;
    type: "build";
    prompt: string;
    keywords: string[];
    sampleAnswer: string;
    hint: string;
    explanation: string;
};

export type Question = McqQuestion | FixQuestion;

export type TenseKey =
    | "present_simple"
    | "present_continuous"
    | "present_perfect"
    | "present_perfect_continuous"
    | "past_simple"
    | "past_continuous"
    | "past_perfect"
    | "simple_future";

export type TenseProgress = {
    correct: number;
    wrong: number;
    total: number;
};

export const emptyTenseProgress: Record<TenseKey, TenseProgress> = {
    present_simple: { correct: 0, wrong: 0, total: 0 },
    present_continuous: { correct: 0, wrong: 0, total: 0 },
    present_perfect: { correct: 0, wrong: 0, total: 0 },
    present_perfect_continuous: { correct: 0, wrong: 0, total: 0 },
    past_simple: { correct: 0, wrong: 0, total: 0 },
    past_continuous: { correct: 0, wrong: 0, total: 0 },
    past_perfect: { correct: 0, wrong: 0, total: 0 },
    simple_future: { correct: 0, wrong: 0, total: 0 }
};

export const tenseMeta: Record<TenseKey, { title: string; signal: string[] }> = {
    present_simple: {
        title: "Present Simple",
        signal: ["every day", "usually", "often", "always", "sometimes"]
    },
    present_continuous: {
        title: "Present Continuous",
        signal: ["now", "at the moment", "look", "listen", "right now"]
    },
    present_perfect: {
        title: "Present Perfect",
        signal: ["since", "for", "already", "just", "never"]
    },
    present_perfect_continuous: {
        title: "Present Perfect Continuous",
        signal: ["for", "since", "how long", "lately", "recently"]
    },
    past_simple: {
        title: "Past Simple",
        signal: ["yesterday", "ago", "last night", "last week", "in 1980"]
    },
    past_continuous: {
        title: "Past Continuous",
        signal: ["while", "at that time", "when", "from 3 to 5", "all afternoon"]
    },
    past_perfect: {
        title: "Past Perfect",
        signal: ["before", "after", "already", "by the time", "when"]
    },
    simple_future: {
        title: "Simple Future",
        signal: ["tomorrow", "next week", "soon", "I think", "tonight"]
    }
};

export const questionBank: Record<TenseKey, Question[]> = {
    present_simple: [
        { id: 1, type: "mcq", sentence: "The sun ___ in the East.", options: ["rise", "rises", "is rising", "rose"], answer: "rises", hint: "fact / truth", explanation: "Sự thật hiển nhiên dùng Present Simple." },
        { id: 2, type: "mcq", sentence: "She often ___ to school by bike.", options: ["go", "goes", "is going", "went"], answer: "goes", hint: "often", explanation: '"Often" → thói quen → Present Simple.' },
        { id: 3, type: "fix", wrongSentence: "He go to school every day.", answer: "He goes to school every day.", hint: "every day", explanation: 'Chủ ngữ "He" → thêm "es".' },
        { id: 4, type: "mcq", sentence: "They ___ new clothes every month.", options: ["buy", "buys", "are buying", "bought"], answer: "buy", hint: "every month", explanation: "Thói quen → Present Simple." },
        { id: 5, type: "mcq", sentence: "My mother sometimes ___ vegetables at this market.", options: ["buy", "buys", "is buying", "bought"], answer: "buys", hint: "sometimes", explanation: '"Sometimes" → Present Simple.' },
        { id: 6, type: "mcq", sentence: "Rivers usually ___ to the sea.", options: ["flow", "flows", "are flowing", "flowed"], answer: "flow", hint: "usually", explanation: "Sự thật chung → Present Simple." },
        { id: 7, type: "fix", wrongSentence: "She like coffee.", answer: "She likes coffee.", hint: "she", explanation: 'Chủ ngữ số ít → thêm "s".' },
        { id: 8, type: "mcq", sentence: "The train ___ at seven tomorrow morning.", options: ["leave", "leaves", "is leaving now", "left"], answer: "leaves", hint: "timetable", explanation: "Lịch trình cố định có thể dùng Present Simple." },
        { id: 9, type: "mcq", sentence: "We seldom ___ before 6:30.", options: ["eat", "eats", "are eating", "ate"], answer: "eat", hint: "seldom", explanation: '"Seldom" → thói quen.' },
        { id: 10, type: "mcq", sentence: "It often ___ hot in summer.", options: ["be", "is", "being", "was"], answer: "is", hint: "often", explanation: "Hiện tại đơn của to be là is." },
        { id: 11, type: "fix", wrongSentence: "They wants new shoes.", answer: "They want new shoes.", hint: "they", explanation: '"They" đi với động từ nguyên mẫu.' },
        { id: 12, type: "mcq", sentence: "Mary always ___ to work by bus.", options: ["go", "goes", "is going", "went"], answer: "goes", hint: "always", explanation: '"Always" → Present Simple.' },
        { id: 13, type: "mcq", sentence: "That house ___ to Mr. Green.", options: ["belong", "belongs", "is belonging", "belonged"], answer: "belongs", hint: "state", explanation: '"Belong" là stative verb, dùng Present Simple.' },
        { id: 14, type: "fix", wrongSentence: "Her father like tea.", answer: "Her father likes tea.", hint: "father", explanation: 'Chủ ngữ số ít → likes.' },
        { id: 15, type: "mcq", sentence: "Birds ___ their nests in summer.", options: ["build", "builds", "are building", "built"], answer: "build", hint: "general habit", explanation: "Thói quen / quy luật chung." },
        { id: 16, type: "mcq", sentence: "Sometimes I ___ up before the sun rises.", options: ["get", "gets", "am getting", "got"], answer: "get", hint: "sometimes", explanation: '"Sometimes" → Present Simple.' },
        { id: 17, type: "fix", wrongSentence: "The earth circle the sun.", answer: "The earth circles the sun.", hint: "fact", explanation: "Sự thật khoa học → circles." },
        { id: 18, type: "mcq", sentence: "Violets ___ in spring.", options: ["bloom", "blooms", "are blooming", "bloomed"], answer: "bloom", hint: "general truth", explanation: "Quy luật tự nhiên → Present Simple." },
        { id: 19, type: "mcq", sentence: "People ___ English in most of Canada.", options: ["speak", "speaks", "are speaking", "spoke"], answer: "speak", hint: "general fact", explanation: "Sự thật chung → Present Simple." },
        { id: 20, type: "fix", wrongSentence: "My brother can swims.", answer: "My brother can swim.", hint: "modal verb", explanation: 'Sau "can" dùng động từ nguyên mẫu.' }
    ],

    present_continuous: [
        { id: 101, type: "mcq", sentence: "Look! The boy ___.", options: ["cry", "cries", "is crying", "cried"], answer: "is crying", hint: "Look!", explanation: '"Look!" → hành động đang diễn ra.' },
        { id: 102, type: "mcq", sentence: "They ___ dinner at the moment.", options: ["have", "are having", "had", "having"], answer: "are having", hint: "at the moment", explanation: "Present Continuous." },
        { id: 103, type: "fix", wrongSentence: "I am know the answer now.", answer: "I know the answer now.", hint: "stative verb", explanation: '"Know" không dùng continuous.' },
        { id: 104, type: "mcq", sentence: "She ___ in the kitchen now.", options: ["cook", "cooks", "is cooking", "cooked"], answer: "is cooking", hint: "now", explanation: "Hành động đang xảy ra." },
        { id: 105, type: "mcq", sentence: "Be quiet! The baby ___.", options: ["sleeps", "is sleeping", "slept", "has slept"], answer: "is sleeping", hint: "Be quiet!", explanation: "Hành động đang xảy ra ngay lúc nói." },
        { id: 106, type: "mcq", sentence: "The farmers ___ in the field at the moment.", options: ["work", "worked", "are working", "have worked"], answer: "are working", hint: "at the moment", explanation: "Present Continuous." },
        { id: 107, type: "fix", wrongSentence: "They are understand the lesson now.", answer: "They understand the lesson now.", hint: "stative verb", explanation: '"Understand" thường không dùng continuous.' },
        { id: 108, type: "mcq", sentence: "Listen! Someone ___ at the door.", options: ["knocks", "is knocking", "knocked", "has knocked"], answer: "is knocking", hint: "Listen!", explanation: '"Listen!" → hành động đang xảy ra.' },
        { id: 109, type: "mcq", sentence: "What ___ at the moment?", options: ["do you do", "are you doing", "did you do", "have you done"], answer: "are you doing", hint: "at the moment", explanation: "Present Continuous question." },
        { id: 110, type: "mcq", sentence: "The company I work for ___ well this year.", options: ["doesn't do", "isn't doing", "didn't do", "hasn't done"], answer: "isn't doing", hint: "this year", explanation: "Tình huống đang diễn ra trong giai đoạn hiện tại." },
        { id: 111, type: "fix", wrongSentence: "She is wanting to go for a walk now.", answer: "She wants to go for a walk now.", hint: "want", explanation: '"Want" là stative verb.' },
        { id: 112, type: "mcq", sentence: "I ___ a course at college this term.", options: ["do", "am doing", "did", "have done"], answer: "am doing", hint: "this term", explanation: "Hành động đang diễn ra trong giai đoạn hiện tại." },
        { id: 113, type: "mcq", sentence: "He ___ next week.", options: ["comes", "is coming", "came", "has come"], answer: "is coming", hint: "next week arrangement", explanation: "Sắp xếp gần trong tương lai có thể dùng Present Continuous." },
        { id: 114, type: "fix", wrongSentence: "I am being tired now.", answer: "I am tired now.", hint: "to be", explanation: 'Không dùng continuous với "be" trong nghĩa trạng thái này.' },
        { id: 115, type: "mcq", sentence: "My parents ___ trees tomorrow.", options: ["plant", "planted", "are planting", "have planted"], answer: "are planting", hint: "tomorrow arrangement", explanation: "Kế hoạch gần đã sắp xếp." },
        { id: 116, type: "mcq", sentence: "It ___ now.", options: ["rains", "is raining", "rained", "has rained"], answer: "is raining", hint: "now", explanation: "Present Continuous." },
        { id: 117, type: "fix", wrongSentence: "Do you understanding your lesson?", answer: "Do you understand your lesson?", hint: "understand", explanation: '"Understand" không dùng continuous.' },
        { id: 118, type: "mcq", sentence: "The children ___ football now.", options: ["play", "are playing", "played", "have played"], answer: "are playing", hint: "now", explanation: "Hành động đang diễn ra." },
        { id: 119, type: "mcq", sentence: "I ___ quite busy these days.", options: ["am being", "am", "was", "have been"], answer: "am", hint: "state", explanation: '"Be" ở nghĩa trạng thái dùng simple form.' },
        { id: 120, type: "fix", wrongSentence: "She are cooking now.", answer: "She is cooking now.", hint: "she", explanation: 'Chủ ngữ "She" → is.' }
    ],

    present_perfect: [
        { id: 301, type: "mcq", sentence: "I ___ that film several times.", options: ["see", "saw", "have seen", "seeing"], answer: "have seen", hint: "several times", explanation: "Trải nghiệm → Present Perfect." },
        { id: 302, type: "mcq", sentence: "She ___ her homework already.", options: ["finish", "finished", "has finished", "finishing"], answer: "has finished", hint: "already", explanation: '"Already" → Present Perfect.' },
        { id: 303, type: "mcq", sentence: "They ___ here since 1990.", options: ["live", "lived", "have lived", "living"], answer: "have lived", hint: "since", explanation: "Since → Present Perfect." },
        { id: 304, type: "fix", wrongSentence: "I am lived here for 5 years.", answer: "I have lived here for 5 years.", hint: "for", explanation: "For → Present Perfect." },
        { id: 305, type: "mcq", sentence: "He ___ just ___ his sister in the park.", options: ["has / seen", "had / seen", "is / seeing", "does / see"], answer: "has / seen", hint: "just", explanation: '"Just" rất hay đi với Present Perfect.' },
        { id: 306, type: "mcq", sentence: "Mary ___ in this house for ten years.", options: ["lives", "lived", "has lived", "is living"], answer: "has lived", hint: "for ten years", explanation: '"For + khoảng thời gian" → Present Perfect.' },
        { id: 307, type: "fix", wrongSentence: "She has finish her homework recently.", answer: "She has finished her homework recently.", hint: "has + V3", explanation: 'Sau "has" dùng V3.' },
        { id: 308, type: "mcq", sentence: "I ___ never ___ there.", options: ["have / been", "had / been", "am / being", "do / be"], answer: "have / been", hint: "never", explanation: '"Never" → Present Perfect.' },
        { id: 309, type: "mcq", sentence: "She ___ all the books written by Dickens.", options: ["reads", "read", "has read", "is reading"], answer: "has read", hint: "all the books", explanation: "Kinh nghiệm / kết quả đến hiện tại." },
        { id: 310, type: "mcq", sentence: "How many books ___?", options: ["do you read", "did you read", "have you read", "are you reading"], answer: "have you read", hint: "experience until now", explanation: "Hỏi số lần / số lượng đến hiện tại." },
        { id: 311, type: "fix", wrongSentence: "He has went to Paris.", answer: "He has gone to Paris.", hint: "V3 of go", explanation: 'V3 của "go" là "gone".' },
        { id: 312, type: "mcq", sentence: "Mai ___ her dictionary.", options: ["loses", "lost", "has lost", "is losing"], answer: "has lost", hint: "result now", explanation: "Mất ở quá khứ nhưng kết quả còn ở hiện tại." },
        { id: 313, type: "mcq", sentence: "I ___ sorry. I ___ that girl's name already.", options: ["am / have forgotten", "was / forgot", "am / forget", "have been / forgot"], answer: "am / have forgotten", hint: "already", explanation: "Kết quả quên còn ảnh hưởng ở hiện tại." },
        { id: 314, type: "fix", wrongSentence: "They have study English since 1990.", answer: "They have studied English since 1990.", hint: "since", explanation: 'Sau "have" dùng V3.' },
        { id: 315, type: "mcq", sentence: "You ___ this watch.", options: ["broke", "have broken", "break", "are breaking"], answer: "have broken", hint: "result now", explanation: "Đồng hồ hiện không hoạt động → Present Perfect." },
        { id: 316, type: "mcq", sentence: "Tom ___ never ___ in Hanoi.", options: ["has / been", "had / been", "is / being", "does / be"], answer: "has / been", hint: "never", explanation: "Kinh nghiệm chưa từng có." },
        { id: 317, type: "fix", wrongSentence: "I have see her before.", answer: "I have seen her before.", hint: "V3 of see", explanation: 'V3 của "see" là "seen".' },
        { id: 318, type: "mcq", sentence: "He ___ a book since last year.", options: ["writes", "wrote", "has written", "is writing"], answer: "has written", hint: "since last year", explanation: "Từ mốc quá khứ đến hiện tại." },
        { id: 319, type: "mcq", sentence: "You ___ any letter from your parents yet?", options: ["did you receive", "have you received", "are you receiving", "do you receive"], answer: "have you received", hint: "yet", explanation: '"Yet" trong câu hỏi → Present Perfect.' },
        { id: 320, type: "fix", wrongSentence: "We not have received any letter yet.", answer: "We have not received any letter yet.", hint: "negative form", explanation: 'Phủ định Present Perfect: have not + V3.' }
    ],

    present_perfect_continuous: [
        { id: 401, type: "mcq", sentence: "I ___ French for five years.", options: ["study", "studied", "have been studying", "am studying"], answer: "have been studying", hint: "for five years", explanation: '"For + khoảng thời gian" rất hay dùng với Present Perfect Continuous.' },
        { id: 402, type: "mcq", sentence: "They ___ in this city since 1995.", options: ["live", "lived", "have been living", "are living"], answer: "have been living", hint: "since 1995", explanation: "Hành động bắt đầu trong quá khứ và kéo dài đến hiện tại." },
        { id: 403, type: "fix", wrongSentence: "She is waiting for you since 8 o'clock.", answer: "She has been waiting for you since 8 o'clock.", hint: "since 8 o'clock", explanation: "Với hành động kéo dài từ quá khứ đến hiện tại, dùng Present Perfect Continuous." },
        { id: 404, type: "mcq", sentence: "How long ___ for her?", options: ["do you wait", "have you been waiting", "are you waiting", "did you wait"], answer: "have you been waiting", hint: "How long", explanation: '"How long" + hành động kéo dài → Present Perfect Continuous.' },
        { id: 405, type: "mcq", sentence: "He ___ a novel for two years.", options: ["writes", "has written", "has been writing", "is writing"], answer: "has been writing", hint: "for two years", explanation: "Nhấn mạnh tính liên tục của hành động." },
        { id: 406, type: "mcq", sentence: "Mary ___ for her hat until now.", options: ["looks", "looked", "has been looking", "is looking"], answer: "has been looking", hint: "until now", explanation: "Hành động kéo dài đến hiện tại." },
        { id: 407, type: "fix", wrongSentence: "I have studying English for 5 years.", answer: "I have been studying English for 5 years.", hint: "have been + V-ing", explanation: "Công thức đúng là have/has been + V-ing." },
        { id: 408, type: "mcq", sentence: "You are out of breath. ___?", options: ["Have you run", "Have you been running", "Did you run", "Are you running"], answer: "Have you been running", hint: "result now", explanation: "Hành động vừa kết thúc và còn kết quả ở hiện tại." },
        { id: 409, type: "mcq", sentence: "I ___ for the manager for two hours.", options: ["wait", "waited", "have been waiting", "am waiting"], answer: "have been waiting", hint: "for two hours", explanation: "Hành động kéo dài liên tục." },
        { id: 410, type: "fix", wrongSentence: "They have been live here since 1975.", answer: "They have been living here since 1975.", hint: "V-ing", explanation: 'Sau "have been" dùng V-ing.' },
        { id: 411, type: "mcq", sentence: "How long ___ English?", options: ["have you studied", "have you been studying", "do you study", "did you study"], answer: "have you been studying", hint: "How long", explanation: "Nhấn mạnh quá trình học kéo dài." },
        { id: 412, type: "mcq", sentence: "I ___ the bell for the last twenty minutes.", options: ["ring", "rang", "have been ringing", "am ringing"], answer: "have been ringing", hint: "for the last twenty minutes", explanation: "Quá trình kéo dài liên tục tới hiện tại." },
        { id: 413, type: "fix", wrongSentence: "She has been know him for years.", answer: "She has known him for years.", hint: "stative verb", explanation: '"Know" là stative verb, dùng Present Perfect thay vì PPC.' },
        { id: 414, type: "mcq", sentence: "We ___ hard lately.", options: ["work", "worked", "have been working", "are working"], answer: "have been working", hint: "lately", explanation: '"Lately" rất hợp với Present Perfect Continuous.' },
        { id: 415, type: "mcq", sentence: "She ___ all morning.", options: ["has cooked", "has been cooking", "is cooking", "cooked"], answer: "has been cooking", hint: "all morning", explanation: "Nhấn mạnh tính kéo dài." },
        { id: 416, type: "fix", wrongSentence: "He has been wait for an hour.", answer: "He has been waiting for an hour.", hint: "waiting", explanation: "Sau have been dùng V-ing." },
        { id: 417, type: "mcq", sentence: "Why are your hands dirty? I ___ in the garden.", options: ["work", "worked", "have been working", "am working"], answer: "have been working", hint: "result now", explanation: "Kết quả hiện tại do hành động vừa kéo dài gây ra." },
        { id: 418, type: "mcq", sentence: "They ___ here all day.", options: ["sit", "sat", "have been sitting", "are sitting"], answer: "have been sitting", hint: "all day", explanation: "Present Perfect Continuous." },
        { id: 419, type: "fix", wrongSentence: "I am studying French for five years.", answer: "I have been studying French for five years.", hint: "for five years", explanation: "Với khoảng thời gian kéo dài đến hiện tại dùng PPC." },
        { id: 420, type: "mcq", sentence: "Recently, she ___ a lot of overtime.", options: ["does", "did", "has been doing", "is doing"], answer: "has been doing", hint: "recently", explanation: '"Recently" có thể dùng với PPC để nhấn mạnh quá trình gần đây.' }
    ],

    past_simple: [
        { id: 201, type: "mcq", sentence: "Tom ___ to Paris last summer.", options: ["go", "goes", "went", "gone"], answer: "went", hint: "last summer", explanation: "Quá khứ có thời gian rõ." },
        { id: 202, type: "mcq", sentence: "She ___ in this city two years ago.", options: ["leave", "left", "leaves", "leaving"], answer: "left", hint: "two years ago", explanation: "Past Simple." },
        { id: 203, type: "fix", wrongSentence: "He don’t watch TV last night.", answer: "He didn’t watch TV last night.", hint: "last night", explanation: "Past Simple → dùng didn’t." },
        { id: 204, type: "mcq", sentence: "Mozart ___ more than 600 pieces of music.", options: ["write", "writes", "wrote", "written"], answer: "wrote", hint: "past fact", explanation: "Hành động đã kết thúc." },
        { id: 205, type: "mcq", sentence: "What ___ yesterday?", options: ["do you do", "did you do", "have you done", "were you doing"], answer: "did you do", hint: "yesterday", explanation: "Past Simple với thời gian quá khứ rõ." },
        { id: 206, type: "mcq", sentence: "She ___ born in 1980.", options: ["is", "was", "has been", "had been"], answer: "was", hint: "in 1980", explanation: "Sự kiện quá khứ rõ thời gian." },
        { id: 207, type: "fix", wrongSentence: "Did you watched TV last night?", answer: "Did you watch TV last night?", hint: "Did + V1", explanation: 'Sau "Did" dùng động từ nguyên mẫu.' },
        { id: 208, type: "mcq", sentence: "He ___ in 1980.", options: ["dies", "died", "has died", "was dying"], answer: "died", hint: "in 1980", explanation: "Past Simple." },
        { id: 209, type: "mcq", sentence: "I ___ Arthur three weeks ago.", options: ["meet", "met", "have met", "was meeting"], answer: "met", hint: "three weeks ago", explanation: "Past Simple." },
        { id: 210, type: "mcq", sentence: "Yesterday the police ___ the thief.", options: ["report", "reported", "have reported", "are reporting"], answer: "reported", hint: "yesterday", explanation: "Past Simple." },
        { id: 211, type: "fix", wrongSentence: "She didn’t went to the cinema.", answer: "She didn’t go to the cinema.", hint: "didn't + V1", explanation: "Sau didn't dùng động từ nguyên mẫu." },
        { id: 212, type: "mcq", sentence: "Last month I ___ in the hospital for ten days.", options: ["am", "was", "have been", "had been"], answer: "was", hint: "last month", explanation: "Past Simple của to be." },
        { id: 213, type: "mcq", sentence: "Columbus ___ America more than 400 years ago.", options: ["discovers", "discovered", "has discovered", "was discovering"], answer: "discovered", hint: "more than 400 years ago", explanation: "Past Simple." },
        { id: 214, type: "fix", wrongSentence: "She leave home two weeks ago.", answer: "She left home two weeks ago.", hint: "two weeks ago", explanation: "Động từ quá khứ của leave là left." },
        { id: 215, type: "mcq", sentence: "When ___ your father ___?", options: ["did / die", "has / died", "was / dying", "had / died"], answer: "did / die", hint: "specific past time", explanation: "Hỏi sự kiện đã hoàn tất trong quá khứ." },
        { id: 216, type: "mcq", sentence: "Long ago, my younger brother often ___.", options: ["cry", "cries", "cried", "has cried"], answer: "cried", hint: "long ago", explanation: "Thói quen trong quá khứ → Past Simple." },
        { id: 217, type: "fix", wrongSentence: "He left home and we didn't heard from him since then.", answer: "He left home and we haven't heard from him since then.", hint: "since then", explanation: "Vế sau dùng Present Perfect; vế đầu vẫn là Past Simple." },
        { id: 218, type: "mcq", sentence: "David ___ born after his father had died.", options: ["is", "was", "has been", "had been"], answer: "was", hint: "born", explanation: "Past Simple của to be." },
        { id: 219, type: "mcq", sentence: "I ___ her last year.", options: ["see", "saw", "have seen", "am seeing"], answer: "saw", hint: "last year", explanation: "Past Simple." },
        { id: 220, type: "fix", wrongSentence: "What did you did after you went home?", answer: "What did you do after you went home?", hint: "did + V1", explanation: "Sau did dùng động từ nguyên mẫu." }
    ],

    past_continuous: [
        { id: 501, type: "mcq", sentence: "I ___ my homework at 6 p.m. yesterday.", options: ["did", "was doing", "have done", "am doing"], answer: "was doing", hint: "at 6 p.m. yesterday", explanation: "Hành động đang diễn ra tại một thời điểm trong quá khứ." },
        { id: 502, type: "mcq", sentence: "While my father ___ a newspaper, I was learning my lesson.", options: ["read", "was reading", "reads", "had read"], answer: "was reading", hint: "while", explanation: '"While" thường đi với Past Continuous.' },
        { id: 503, type: "fix", wrongSentence: "When I came, he slept.", answer: "When I came, he was sleeping.", hint: "when I came", explanation: "Một hành động đang diễn ra bị hành động khác xen vào." },
        { id: 504, type: "mcq", sentence: "They ___ English at that time.", options: ["practised", "were practising", "have practised", "practise"], answer: "were practising", hint: "at that time", explanation: "Past Continuous." },
        { id: 505, type: "mcq", sentence: "The light went out while we ___ dinner.", options: ["had", "were having", "have had", "are having"], answer: "were having", hint: "while", explanation: "Hành động đang diễn ra trong quá khứ." },
        { id: 506, type: "mcq", sentence: "Bill ___ breakfast when I stopped at his house.", options: ["was having", "had", "has had", "is having"], answer: "was having", hint: "when I stopped", explanation: "Hành động kéo dài bị xen vào." },
        { id: 507, type: "fix", wrongSentence: "As we crossed the street, the policeman shouted at us.", answer: "As we were crossing the street, the policeman shouted at us.", hint: "as", explanation: "Hành động đang xảy ra thì bị xen vào." },
        { id: 508, type: "mcq", sentence: "Tom ___ at the bus stop when he saw the accident.", options: ["stood", "was standing", "has stood", "stands"], answer: "was standing", hint: "when he saw", explanation: "Past Continuous + Past Simple." },
        { id: 509, type: "mcq", sentence: "The children ___ football when their mother came home.", options: ["played", "were playing", "have played", "play"], answer: "were playing", hint: "when their mother came", explanation: "Past Continuous." },
        { id: 510, type: "fix", wrongSentence: "The bell rang while Tom took a bath.", answer: "The bell rang while Tom was taking a bath.", hint: "while", explanation: 'Sau "while" thường là hành động kéo dài.' },
        { id: 511, type: "mcq", sentence: "He ___ in a cafe when I saw him.", options: ["sat", "was sitting", "has sat", "sits"], answer: "was sitting", hint: "when I saw him", explanation: "Past Continuous." },
        { id: 512, type: "mcq", sentence: "At 4 p.m. yesterday, I ___ in my office.", options: ["worked", "was working", "have worked", "am working"], answer: "was working", hint: "at 4 p.m. yesterday", explanation: "Một thời điểm xác định trong quá khứ." },
        { id: 513, type: "fix", wrongSentence: "They practised English at that time.", answer: "They were practising English at that time.", hint: "at that time", explanation: "Past Continuous phù hợp hơn." },
        { id: 514, type: "mcq", sentence: "She ___ the piano when our guests arrived.", options: ["played", "was playing", "has played", "plays"], answer: "was playing", hint: "when our guests arrived", explanation: "Hành động đang diễn ra trong quá khứ." },
        { id: 515, type: "mcq", sentence: "Yesterday, I ___ while my sister was washing the dishes.", options: ["cooked", "was cooking", "have cooked", "cook"], answer: "was cooking", hint: "while", explanation: "Hai hành động đồng thời trong quá khứ." },
        { id: 516, type: "fix", wrongSentence: "When the teacher came in, the pupils played games.", answer: "When the teacher came in, the pupils were playing games.", hint: "came in", explanation: "Past Continuous + Past Simple." },
        { id: 517, type: "mcq", sentence: "Yesterday, Mr Moore ___ in the laboratory all the afternoon.", options: ["worked", "was working", "has worked", "works"], answer: "was working", hint: "all the afternoon", explanation: "Hành động kéo dài trong quá khứ." },
        { id: 518, type: "mcq", sentence: "What ___ from 3 p.m. to 6 p.m. yesterday?", options: ["did you do", "were you doing", "have you done", "are you doing"], answer: "were you doing", hint: "from 3 p.m. to 6 p.m.", explanation: "Khoảng thời gian đang diễn ra trong quá khứ." },
        { id: 519, type: "fix", wrongSentence: "While my father read a newspaper, I was doing my homework.", answer: "While my father was reading a newspaper, I was doing my homework.", hint: "while", explanation: 'Sau "while" diễn tả hành động kéo dài → was reading.' },
        { id: 520, type: "mcq", sentence: "It ___ when we arrived.", options: ["rained", "was raining", "has rained", "rains"], answer: "was raining", hint: "when we arrived", explanation: "Past Continuous." }
    ],

    past_perfect: [
        { id: 601, type: "mcq", sentence: "When I got up this morning, my father ___ already ___.", options: ["has / left", "had / left", "was / leaving", "did / leave"], answer: "had / left", hint: "when I got up", explanation: "Hành động xảy ra trước một hành động quá khứ khác → Past Perfect." },
        { id: 602, type: "mcq", sentence: "After the children ___ their homework, they went to bed.", options: ["finished", "had finished", "have finished", "were finishing"], answer: "had finished", hint: "after", explanation: '"After" + hành động hoàn tất trước → Past Perfect.' },
        { id: 603, type: "fix", wrongSentence: "Before she watched TV, she did her homework.", answer: "Before she watched TV, she had done her homework.", hint: "before", explanation: "Hành động làm bài xảy ra trước hành động xem TV." },
        { id: 604, type: "mcq", sentence: "The match ___ already ___ when we came to the stadium.", options: ["has / begun", "had / begun", "was / beginning", "did / begin"], answer: "had / begun", hint: "already", explanation: "Past Perfect dùng cho hành động xảy ra trước một mốc quá khứ." },
        { id: 605, type: "mcq", sentence: "They went home after they ___ their work.", options: ["finished", "had finished", "have finished", "were finishing"], answer: "had finished", hint: "after", explanation: "Past Perfect." },
        { id: 606, type: "mcq", sentence: "She said that she ___ Dr. Rice already.", options: ["saw", "has seen", "had seen", "was seeing"], answer: "had seen", hint: "already", explanation: "Hành động xảy ra trước thời điểm nói trong quá khứ." },
        { id: 607, type: "fix", wrongSentence: "When we came to the stadium, the match already began.", answer: "When we came to the stadium, the match had already begun.", hint: "already", explanation: "Past Perfect phù hợp hơn." },
        { id: 608, type: "mcq", sentence: "They told me they ___ such kind of food before.", options: ["didn't eat", "hadn't eaten", "haven't eaten", "weren't eating"], answer: "hadn't eaten", hint: "before", explanation: "Past Perfect negative." },
        { id: 609, type: "mcq", sentence: "He asked why we ___ so early.", options: ["came", "had come", "have come", "were coming"], answer: "had come", hint: "asked why", explanation: "Hành động đến xảy ra trước hành động hỏi." },
        { id: 610, type: "fix", wrongSentence: "I sat down and rested after they went.", answer: "I sat down and rested after they had gone.", hint: "after", explanation: "Hành động đi xảy ra trước." },
        { id: 611, type: "mcq", sentence: "It was the first time I ___ such a beautiful girl.", options: ["saw", "had ever seen", "have ever seen", "was seeing"], answer: "had ever seen", hint: "the first time", explanation: "Past Perfect." },
        { id: 612, type: "mcq", sentence: "Before Alice went to sleep, she ___ her family.", options: ["called", "had called", "has called", "was calling"], answer: "had called", hint: "before", explanation: "Past Perfect." },
        { id: 613, type: "fix", wrongSentence: "When John and I got to the theatre, the movie already started.", answer: "When John and I got to the theatre, the movie had already started.", hint: "already", explanation: "Past Perfect + already." },
        { id: 614, type: "mcq", sentence: "I saw that I ___ a mistake.", options: ["made", "had made", "have made", "was making"], answer: "had made", hint: "saw that", explanation: "Lỗi xảy ra trước lúc nhận ra." },
        { id: 615, type: "mcq", sentence: "Bill said he ___ to buy a dictionary.", options: ["forgot", "had forgotten", "has forgotten", "was forgetting"], answer: "had forgotten", hint: "reported past", explanation: "Past Perfect trong lời tường thuật." },
        { id: 616, type: "fix", wrongSentence: "They had sold all the books when we had got there.", answer: "They had sold all the books when we got there.", hint: "sequence", explanation: "Một hành động trước dùng Past Perfect, hành động sau dùng Past Simple." },
        { id: 617, type: "mcq", sentence: "My teacher wasn't at home when I arrived. He ___ just ___.", options: ["had / gone", "has / gone", "was / going", "did / go"], answer: "had / gone", hint: "just", explanation: "Hành động rời đi xảy ra trước lúc tôi đến." },
        { id: 618, type: "mcq", sentence: "By the time we arrived, she ___ a big cake.", options: ["made", "had made", "has made", "was making"], answer: "had made", hint: "by the time", explanation: "Past Perfect." },
        { id: 619, type: "fix", wrongSentence: "He had did his homework before he went to the cinema.", answer: "He had done his homework before he went to the cinema.", hint: "V3 of do", explanation: 'V3 của "do" là "done".' },
        { id: 620, type: "mcq", sentence: "After they ___, I sat down and rested.", options: ["went", "had gone", "have gone", "were going"], answer: "had gone", hint: "after", explanation: "Past Perfect." }
    ],

    simple_future: [
        { id: 701, type: "mcq", sentence: "He ___ back next week.", options: ["comes", "came", "will come", "is coming back now"], answer: "will come", hint: "next week", explanation: "Simple Future diễn tả hành động sẽ xảy ra trong tương lai." },
        { id: 702, type: "mcq", sentence: "I think Liverpool ___.", options: ["wins", "won", "will win", "is winning"], answer: "will win", hint: "I think", explanation: 'Ý kiến / dự đoán thường dùng "will".' },
        { id: 703, type: "fix", wrongSentence: "I phone you tonight.", answer: "I will phone you tonight.", hint: "tonight", explanation: "Lời hứa hoặc quyết định cho tương lai → will." },
        { id: 704, type: "mcq", sentence: "We ___ the money on the 15th.", options: ["need", "needed", "will need", "are needing"], answer: "will need", hint: "on the 15th", explanation: "Simple Future." },
        { id: 705, type: "mcq", sentence: "I ___ you some postcards as soon as I arrive in London.", options: ["send", "will send", "am sending now", "sent"], answer: "will send", hint: "future main clause", explanation: "Mệnh đề chính ở tương lai → will." },
        { id: 706, type: "mcq", sentence: "Miss Helen ___ you as soon as she finishes that letter.", options: ["helps", "helped", "will help", "is helping now"], answer: "will help", hint: "as soon as", explanation: "Mệnh đề chính dùng Simple Future." },
        { id: 707, type: "fix", wrongSentence: "She will not comes until you are ready.", answer: "She will not come until you are ready.", hint: "will + V1", explanation: 'Sau "will" dùng động từ nguyên mẫu.' },
        { id: 708, type: "mcq", sentence: "I ___ and see you before I leave here.", options: ["come", "will come", "came", "am coming now"], answer: "will come", hint: "promise / future", explanation: "Simple Future." },
        { id: 709, type: "mcq", sentence: "We ___ home as soon as we have finished our work.", options: ["go", "will go", "went", "have gone"], answer: "will go", hint: "future main clause", explanation: "Mệnh đề chính ở tương lai." },
        { id: 710, type: "fix", wrongSentence: "I will wait here until you will come back.", answer: "I will wait here until you come back.", hint: "time clause", explanation: "Trong mệnh đề thời gian không dùng will." },
        { id: 711, type: "mcq", sentence: "Who ___ after the children when you are away?", options: ["looks", "looked", "will look", "is looking now"], answer: "will look", hint: "future", explanation: "Simple Future." },
        { id: 712, type: "mcq", sentence: "They ___ on Wednesday.", options: ["arrive", "arrived", "will arrive", "have arrived"], answer: "will arrive", hint: "on Wednesday", explanation: "Tương lai có thời gian rõ." },
        { id: 713, type: "fix", wrongSentence: "He certainly will not does all his homework by ten tonight.", answer: "He certainly will not do all his homework by ten tonight.", hint: "will not + V1", explanation: 'Sau "will not" dùng động từ nguyên mẫu.' },
        { id: 714, type: "mcq", sentence: "I hope the weather ___ fine tonight.", options: ["is", "was", "will be", "has been"], answer: "will be", hint: "I hope", explanation: "Simple Future dùng cho dự đoán / hi vọng." },
        { id: 715, type: "mcq", sentence: "I ___ to you about that matter after the meeting tonight.", options: ["speak", "spoke", "will speak", "am speaking now"], answer: "will speak", hint: "after the meeting tonight", explanation: "Simple Future." },
        { id: 716, type: "fix", wrongSentence: "He'll leave as soon as he will hear the news.", answer: "He'll leave as soon as he hears the news.", hint: "time clause", explanation: "Mệnh đề thời gian dùng Present Simple." },
        { id: 717, type: "mcq", sentence: "I think he ___ as soon as he knows the news.", options: ["leave", "will leave", "left", "has left"], answer: "will leave", hint: "I think", explanation: "Simple Future." },
        { id: 718, type: "mcq", sentence: "My mother ___ to stay with us next weekend.", options: ["comes", "came", "will come", "has come"], answer: "will come", hint: "next weekend", explanation: "Tương lai đơn." },
        { id: 719, type: "fix", wrongSentence: "I not send the parcel until I hear from you.", answer: "I will not send the parcel until I hear from you.", hint: "future negative", explanation: "Main clause ở tương lai dùng will not." },
        { id: 720, type: "mcq", sentence: "The teacher hopes we ___ our exams.", options: ["pass", "passed", "will pass", "have passed"], answer: "will pass", hint: "hopes", explanation: "Simple Future trong mệnh đề that được chấp nhận ở đây." }
    ]
};

export const buildQuestions: Record<TenseKey, BuildQuestion[]> = {
    present_simple: [
        { id: 1001, type: "build", prompt: "Viết 1 câu ở Present Simple.", keywords: ["she", "go", "school", "every day"], sampleAnswer: "She goes to school every day.", hint: "every day", explanation: 'Present Simple + chủ ngữ "She" → goes.' },
        { id: 1002, type: "build", prompt: "Viết 1 câu ở Present Simple.", keywords: ["they", "buy", "new clothes", "every month"], sampleAnswer: "They buy new clothes every month.", hint: "every month", explanation: "Thói quen → Present Simple." },
        { id: 1003, type: "build", prompt: "Viết 1 câu ở Present Simple.", keywords: ["my mother", "buy", "vegetables", "sometimes"], sampleAnswer: "My mother sometimes buys vegetables.", hint: "sometimes", explanation: "Thói quen → Present Simple." },
        { id: 1004, type: "build", prompt: "Viết 1 câu ở Present Simple.", keywords: ["the sun", "rise", "in the East"], sampleAnswer: "The sun rises in the East.", hint: "fact", explanation: "Sự thật hiển nhiên." },
        { id: 1005, type: "build", prompt: "Viết 1 câu ở Present Simple.", keywords: ["Mary", "go", "to work", "by bus"], sampleAnswer: "Mary goes to work by bus.", hint: "habit", explanation: "Thói quen hằng ngày." }
    ],
    present_continuous: [
        { id: 1101, type: "build", prompt: "Viết 1 câu ở Present Continuous.", keywords: ["the boy", "cry", "now"], sampleAnswer: "The boy is crying now.", hint: "now", explanation: "Hành động đang diễn ra." },
        { id: 1102, type: "build", prompt: "Viết 1 câu ở Present Continuous.", keywords: ["she", "cook", "in the kitchen", "now"], sampleAnswer: "She is cooking in the kitchen now.", hint: "now", explanation: "Present Continuous." },
        { id: 1103, type: "build", prompt: "Viết 1 câu ở Present Continuous.", keywords: ["the baby", "sleep", "now"], sampleAnswer: "The baby is sleeping now.", hint: "now", explanation: "Hành động đang xảy ra." },
        { id: 1104, type: "build", prompt: "Viết 1 câu ở Present Continuous.", keywords: ["they", "have", "dinner", "at the moment"], sampleAnswer: "They are having dinner at the moment.", hint: "at the moment", explanation: "Present Continuous." },
        { id: 1105, type: "build", prompt: "Viết 1 câu ở Present Continuous.", keywords: ["someone", "knock", "at the door", "now"], sampleAnswer: "Someone is knocking at the door now.", hint: "now", explanation: "Hành động đang diễn ra." }
    ],
    present_perfect: [
        { id: 1201, type: "build", prompt: "Viết 1 câu ở Present Perfect.", keywords: ["I", "see", "that film", "several times"], sampleAnswer: "I have seen that film several times.", hint: "several times", explanation: "Trải nghiệm đến hiện tại." },
        { id: 1202, type: "build", prompt: "Viết 1 câu ở Present Perfect.", keywords: ["they", "live", "here", "since 1990"], sampleAnswer: "They have lived here since 1990.", hint: "since 1990", explanation: '"Since" → Present Perfect.' },
        { id: 1203, type: "build", prompt: "Viết 1 câu ở Present Perfect.", keywords: ["Mary", "live", "in this house", "for ten years"], sampleAnswer: "Mary has lived in this house for ten years.", hint: "for ten years", explanation: '"For" + khoảng thời gian.' },
        { id: 1204, type: "build", prompt: "Viết 1 câu ở Present Perfect.", keywords: ["she", "finish", "her homework", "already"], sampleAnswer: "She has finished her homework already.", hint: "already", explanation: '"Already" → Present Perfect.' },
        { id: 1205, type: "build", prompt: "Viết 1 câu ở Present Perfect.", keywords: ["I", "never", "be", "there"], sampleAnswer: "I have never been there.", hint: "never", explanation: '"Never" → Present Perfect.' }
    ],
    present_perfect_continuous: [
        { id: 1301, type: "build", prompt: "Viết 1 câu ở Present Perfect Continuous.", keywords: ["I", "study", "French", "for five years"], sampleAnswer: "I have been studying French for five years.", hint: "for five years", explanation: "Hành động kéo dài từ quá khứ đến hiện tại." },
        { id: 1302, type: "build", prompt: "Viết 1 câu ở Present Perfect Continuous.", keywords: ["they", "live", "here", "since 1995"], sampleAnswer: "They have been living here since 1995.", hint: "since 1995", explanation: '"Since" + mốc thời gian.' },
        { id: 1303, type: "build", prompt: "Viết 1 câu ở Present Perfect Continuous.", keywords: ["she", "wait", "for you", "since 8 o'clock"], sampleAnswer: "She has been waiting for you since 8 o'clock.", hint: "since 8 o'clock", explanation: "Quá trình kéo dài." },
        { id: 1304, type: "build", prompt: "Viết 1 câu ở Present Perfect Continuous.", keywords: ["we", "work", "hard", "lately"], sampleAnswer: "We have been working hard lately.", hint: "lately", explanation: '"Lately" hợp với PPC.' },
        { id: 1305, type: "build", prompt: "Viết 1 câu ở Present Perfect Continuous.", keywords: ["he", "write", "a novel", "for two years"], sampleAnswer: "He has been writing a novel for two years.", hint: "for two years", explanation: "Nhấn mạnh tính liên tục." }
    ],
    past_simple: [
        { id: 1401, type: "build", prompt: "Viết 1 câu ở Past Simple.", keywords: ["Tom", "go", "to Paris", "last summer"], sampleAnswer: "Tom went to Paris last summer.", hint: "last summer", explanation: "Past Simple với thời gian rõ." },
        { id: 1402, type: "build", prompt: "Viết 1 câu ở Past Simple.", keywords: ["she", "be born", "in 1980"], sampleAnswer: "She was born in 1980.", hint: "in 1980", explanation: "Past Simple với mốc thời gian rõ." },
        { id: 1403, type: "build", prompt: "Viết 1 câu ở Past Simple.", keywords: ["I", "meet", "Arthur", "three weeks ago"], sampleAnswer: "I met Arthur three weeks ago.", hint: "three weeks ago", explanation: "Past Simple." },
        { id: 1404, type: "build", prompt: "Viết 1 câu ở Past Simple.", keywords: ["he", "die", "in 1980"], sampleAnswer: "He died in 1980.", hint: "in 1980", explanation: "Hành động đã hoàn tất." },
        { id: 1405, type: "build", prompt: "Viết 1 câu ở Past Simple.", keywords: ["she", "leave", "this city", "two years ago"], sampleAnswer: "She left this city two years ago.", hint: "two years ago", explanation: "Past Simple." }
    ],
    past_continuous: [
        { id: 1501, type: "build", prompt: "Viết 1 câu ở Past Continuous.", keywords: ["I", "do", "my homework", "at 6 p.m. yesterday"], sampleAnswer: "I was doing my homework at 6 p.m. yesterday.", hint: "at 6 p.m. yesterday", explanation: "Hành động đang diễn ra tại một thời điểm trong quá khứ." },
        { id: 1502, type: "build", prompt: "Viết 1 câu ở Past Continuous.", keywords: ["they", "practise", "English", "at that time"], sampleAnswer: "They were practising English at that time.", hint: "at that time", explanation: "Past Continuous." },
        { id: 1503, type: "build", prompt: "Viết 1 câu ở Past Continuous.", keywords: ["he", "sleep", "when", "I came"], sampleAnswer: "He was sleeping when I came.", hint: "when I came", explanation: "Một hành động kéo dài bị xen vào." },
        { id: 1504, type: "build", prompt: "Viết 1 câu ở Past Continuous.", keywords: ["the children", "play", "football", "when their mother came home"], sampleAnswer: "The children were playing football when their mother came home.", hint: "when their mother came home", explanation: "Past Continuous + Past Simple." },
        { id: 1505, type: "build", prompt: "Viết 1 câu ở Past Continuous.", keywords: ["we", "have", "dinner", "when the light went out"], sampleAnswer: "We were having dinner when the light went out.", hint: "when the light went out", explanation: "Hành động đang diễn ra trong quá khứ." }
    ],
    past_perfect: [
        { id: 1601, type: "build", prompt: "Viết 1 câu ở Past Perfect.", keywords: ["my father", "leave", "before", "I got up"], sampleAnswer: "My father had left before I got up.", hint: "before I got up", explanation: "Hành động rời đi xảy ra trước hành động thức dậy." },
        { id: 1602, type: "build", prompt: "Viết 1 câu ở Past Perfect.", keywords: ["the children", "finish", "their homework", "before", "they went to bed"], sampleAnswer: "The children had finished their homework before they went to bed.", hint: "before they went to bed", explanation: "Past Perfect." },
        { id: 1603, type: "build", prompt: "Viết 1 câu ở Past Perfect.", keywords: ["the match", "already", "begin", "when we came"], sampleAnswer: "The match had already begun when we came.", hint: "already", explanation: "Past Perfect + already." },
        { id: 1604, type: "build", prompt: "Viết 1 câu ở Past Perfect.", keywords: ["she", "call", "her family", "before", "she went to sleep"], sampleAnswer: "She had called her family before she went to sleep.", hint: "before", explanation: "Hành động gọi xảy ra trước." },
        { id: 1605, type: "build", prompt: "Viết 1 câu ở Past Perfect.", keywords: ["they", "go home", "after", "they finish their work"], sampleAnswer: "They went home after they had finished their work.", hint: "after", explanation: "Past Perfect trong mệnh đề phụ." }
    ],
    simple_future: [
        { id: 1701, type: "build", prompt: "Viết 1 câu ở Simple Future.", keywords: ["he", "come back", "next week"], sampleAnswer: "He will come back next week.", hint: "next week", explanation: "Simple Future." },
        { id: 1702, type: "build", prompt: "Viết 1 câu ở Simple Future.", keywords: ["I", "phone", "you", "tonight"], sampleAnswer: "I will phone you tonight.", hint: "tonight", explanation: 'Lời hứa / quyết định → "will".' },
        { id: 1703, type: "build", prompt: "Viết 1 câu ở Simple Future.", keywords: ["we", "need", "the money", "on the 15th"], sampleAnswer: "We will need the money on the 15th.", hint: "on the 15th", explanation: "Simple Future." },
        { id: 1704, type: "build", prompt: "Viết 1 câu ở Simple Future.", keywords: ["I think", "Liverpool", "win"], sampleAnswer: "I think Liverpool will win.", hint: "I think", explanation: "Dự đoán / ý kiến." },
        { id: 1705, type: "build", prompt: "Viết 1 câu ở Simple Future.", keywords: ["they", "arrive", "on Wednesday"], sampleAnswer: "They will arrive on Wednesday.", hint: "on Wednesday", explanation: "Tương lai có thời gian rõ." }
    ]
};
