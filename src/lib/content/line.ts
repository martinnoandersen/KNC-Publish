import type { Sql } from "@/lib/db";
import { asJson } from "./text";

type Copy = { title: string; dek: string; body: string; caption: string };

const p = (...parts: string[]) => parts.join("\n\n");

const stories: Record<string, { category: string; ckb: Copy; kmr: Copy; en: Copy }> = {
  "citadel-memory": {
    category: "politics",
    ckb: {
      title: "ئەقڵی دەوڵەت لە کوێوە دەست پێدەکات",
      dek: "دەوڵەت بە کەلتوور و زمان دروست نابێت. دەوڵەت کاتێک دەست پێدەکات کە نەتەوە فێر بێت وەک دەوڵەت بیربکاتەوە.",
      caption: "کۆبوونەوەی نووسەران لەسەر ئەقڵی دەوڵەتی.",
      body: p(
        "کوردستان وڵاتێکی داگیرکراوە، و نەتەوەی کورد نەتەوەیە. ئەم دوو ڕستەیە هێشتا دەوڵەت نین. دەوڵەت کاتێک دەست پێدەکات کە خەڵکێک بتوانێت بڵێت دەوڵەت چییە: خاک، خەڵک، دەسەڵات، یاسا، و دامەزراوەیەک کە ئەم چوارە لە یەک بڕیاردا کۆبکاتەوە.",
        "ئەمە ئەقڵی دەوڵەتە. زانستێکی گشتییە، نەک هەستێکی کەلتووری. نەتەوە دەتوانێت زمان و یادەوەری هەبێت و هێشتا دەوڵەتی نەبێت. دەوڵەتسازی لەو گوتارەوە دەست پێدەکات کە پرسیارەکە دەگۆڕێت: چۆن دەژین، دەبێتە چۆن فەرمانڕەوایی دەکەین.",
        "ئەم وتارە لەسەر ئەقڵی دەوڵەتە: خاک، خەڵک، دەسەڵات و یاسا لە یەک بڕیاردا.",
      ),
    },
    kmr: {
      title: "Aqilê dewletê ji ku dest pê dike",
      dek: "Dewlet bi çand û zimanê çê nabe. Dewlet dema dest pê dike ku netewe hîn bibe wek dewletê bifikire.",
      caption: "Civîna nivîskaran li ser aqilê dewletê.",
      body: p(
        "Kurdistan welatekî dagirkirî ye, û neteweya kurd neteweyek e. Ev her du hevok hîn ne dewlet in. Dewlet dema dest pê dike ku gel bikare bibêje dewlet çi ye: ax, gel, desthilat, qanûn, û saziyek ku van çaran di yek biryarê de kom dike.",
        "Ev aqilê dewletê ye. Zanisteke giştî ye, ne hesteke çandî. Netewe dikare ziman û bîrê hebe û hîn dewlet nebe. Avakirina dewletê ji wê gotarê dest pê dike ku pirs diguhere: em çawa dijîn, dibe em çawa hukum dikin.",
        "Ev gotar li ser aqilê dewletê ye: ax, gel, desthilat û qanûn di yek biryarê de.",
      ),
    },
    en: {
      title: "Where the reason of a state begins",
      dek: "A state is not founded by culture or language. It begins when a nation learns to think as a state.",
      caption: "Writers meeting on the reason of the state.",
      body: p(
        "Kurdistan is an occupied country, and the Kurds are a nation. Those two sentences are not yet a state. A state begins when a people can say what a state is: territory, population, authority, law, and an institution that holds the four inside one decision.",
        "That is state reason. It is a public science, not a cultural feeling. A nation can have a language and a memory and still have no state. State formation starts when the question changes, from how we live to how we govern.",
        "This article is about state reason: territory, people, authority and law held in one decision.",
      ),
    },
  },
  "civic-decade": {
    category: "culture",
    ckb: {
      title: "دامەزراندن، نەک بەڕێوەبردن",
      dek: "خزمەتگوزاری لەسەر خاکی داگیرکراو دەوڵەت نییە. دەوڵەت کاتێکە دامەزراوەکان هی یاسای نەتەوەکە بن.",
      caption: "گفتوگۆ لەسەر دامەزراوەکانی دەوڵەت.",
      body: p(
        "بەڕێوەبردن و دامەزراندن یەک شت نین. دەکرێت قوتابخانە، شەقام و فەرمانگە هەبن، و هێشتا دەوڵەت نەبێت، ئەگەر یاساکە هی نەتەوەکە نەبێت. دامەزراندن واتە ئەنجومەن، دادگا، خەزێنە و کارگێڕییەک کە سەر بە دەوڵەتن، نەک سەر بە فەرمانڕەوای داگیرکەر.",
        "نموونەی دەستپێک لە شوێنی ترەوە دەخوێندرێتەوە، نەک بۆ ئەوەی کۆپی بکرێت. ئەوانەی نەرویجیان وەک دەوڵەت دامەزراند، سەرەتا دەقی یاسایی و دامەزراوەیان دانا. ئەوانەی ویلایەتە یەکگرتووەکانیان دامەزراند، سەرەتا گوتارێکی گشتییان لەسەر حکومەت نووسی. مەبەست فیدراڵیزم نییە. مەبەست ڕێگای دەستپێکی دەوڵەتە: دەق، دامەزراوە، و گفتوگۆی گشتی.",
        "کۆنگرەی نیشتمانیی کوردستان گۆڕەپانی ئەو کارەیە. ئەم وتارە بڕیاری کۆنگرە نییە. وتارێکە لەسەر ئەو کارە.",
      ),
    },
    kmr: {
      title: "Avakirin, ne birêvebirin",
      dek: "Xizmet li ser axa dagirkirî ne dewlet e. Dewlet dema ye ku sazî yên qanûna neteweyê bin.",
      caption: "Gotûbêj li ser saziyên dewletê.",
      body: p(
        "Birêvebirin û avakirin ne yek in. Dibistan, kolan û daîre dikarin hebin û hîn dewlet tune be, heke qanûn ne ya neteweyê be. Avakirin wateya encûmen, dadgeh, xezîne û rêveberiyeke ku ser bi dewletê ve ye, ne ser bi dagirker ve.",
        "Mînakên destpêkê ji cihên din têne xwendin, ne ji bo kopîkirinê. Ewên ku Norwêc wek dewlet ava kirin, pêşî nivîs û sazî danîn. Ewên ku Dewletên Yekbûyî ava kirin, pêşî gotareke giştî li ser hukûmetê nivîsandin. Mebest federalîzm nîne. Mebest rêya destpêka dewletê ye: nivîs, sazî, û gotûbêja giştî.",
        "Kongreya Niştimanî ya Kurdistanê qada wî karî ye. Ev gotar biryara kongreyê nîne. Gotarek e li ser wî karî.",
      ),
    },
    en: {
      title: "Institutionalization, not administration",
      dek: "Services on occupied land are not a state. A state exists when the institutions belong to the nation's own law.",
      caption: "A discussion of the institutions of a state.",
      body: p(
        "Administration and institutionalization are not the same thing. Schools, roads and offices can exist and there can still be no state, if the law is not the nation's. Institutionalization means an assembly, a court, a treasury and a civil service that belong to the state, not to an occupying authority.",
        "The way other countries began is read here as a method, not as a model to copy. Those who established Norway as a state began with a legal text and institutions. Those who established the United States began with a public argument about government. The point is not federalism. The point is how a state starts: a text, institutions, and a public discourse.",
        "The Kurdistan National Congress is the arena for that work. This article is not a decision of the congress. It is an article about the work.",
      ),
    },
  },
  "digital-corpus": {
    category: "science",
    ckb: {
      title: "زانستی دەوڵەت: گوتارێک کە دەوڵەت دەکاتە بیر",
      dek: "ئەقڵی دەوڵەتی لقێکی زانستە. پرسیارەکەی ئەوەیە چۆن نەتەوەیەک دەتوانێت دەوڵەت وەک چەمک بناسێت، پێش ئەوەی دەوڵەتەکە تەواو بێت.",
      caption: "سەرچاوەی زانستی دەوڵەت لەسەر مێز.",
      body: p(
        "دەوڵەتسازی بێ گوتاری زانستی ناتەواوە. نەتەوەیەک دەبێت بتوانێت چەمکەکان ڕوون بکاتەوە: سەروەری، هاوڵاتی، دەستوور، دامەزراوە، و جیاوازیی نێوان حیزب و دەوڵەت. ئەمە زمانناسی نییە. ئەمە زانستی دەوڵەتە.",
        "لە ساڵی ١٨١٤دا نەرویج دەستوورێکی نووسی پێش ئەوەی دەوڵەتەکەی مسۆگەر بێت. لە ئەمریکا، نامەکانی فیدراڵیست گوتارێکی گشتی بوون لەسەر ئەوەی ئایا دەوڵەت بە بڕیار دروست دەبێت، نەک بە نەریت تەنها. خوێندنەوەی ئەو نموونانە بۆ کوردستان واتای وەرگرتنی فیدراڵیزم نییە. واتای ئەوەیە دەوڵەت بە گوتار و دەق دەست پێدەکات.",
        "## سەرچاوە\n\nئەم وتارە زانستییە. سەرچاوەکان لە کۆتاییدان. ئەنجامەکە سیاسییە، بەڵام ڕێبازەکەی زانستی دەوڵەتە: چەمک، بەراورد، و سنووری بەراوردەکە.",
      ),
    },
    kmr: {
      title: "Zanista dewletê: gotareke ku dewletê dike fikir",
      dek: "Aqilê dewletê şaxeke zanistê ye. Pirs ev e ka neteweyek çawa dikare dewletê wek têgeh nas bike, berî ku dewlet temam be.",
      caption: "Çavkaniyên zanista dewletê li ser maseyê.",
      body: p(
        "Avakirina dewletê bê gotara zanistî nîvco ye. Divê netewe bikare têgehan ronî bike: serwerî, hemwelatî, destûr, sazî, û cudahiya di navbera partî û dewletê de. Ev ne zimanzanî ye. Ev zanista dewletê ye.",
        "Di 1814an de Norwêcê destûrek nivîsand berî ku dewlet misoger be. Li Amerîkayê, nameyên Federalist gotareke giştî bûn li ser wê yekê ka dewlet bi biryarê çê dibe, ne bi tenê bi örfê. Xwendina wan mînakan ji bo Kurdistanê nayê wateya wergirtina federalîzmê. Tê wateya ku dewlet bi gotar û nivîsê dest pê dike.",
        "## Çavkanî\n\nEv gotara zanistî ye. Çavkanî li dawiyê ne. Encam siyasî ye, lê rêbaz zanista dewletê ye.",
      ),
    },
    en: {
      title: "The science of the state: a discourse that makes a state thinkable",
      dek: "State reason is a branch of knowledge. The question is how a nation can know what a state is before the state is finished.",
      caption: "Sources in the science of the state.",
      body: p(
        "State formation without a scientific discourse is unfinished. A nation has to be able to define the concepts: sovereignty, citizenship, constitution, institution, and the difference between a party and a state. This is not linguistics. It is the science of the state.",
        "In 1814 Norway wrote a constitution before the state was secure. In America, the Federalist papers were a public argument about whether a state can be founded by decision, not only by custom. Reading those examples for Kurdistan does not mean adopting federalism. It means a state begins in discourse and in a text.",
        "## Sources\n\nThis is a scientific article. The references are at the end. The conclusion is political, but the method is the science of the state: a concept, a comparison, and the limit of the comparison.",
      ),
    },
  },
  "tea-square": {
    category: "opinion",
    ckb: {
      title: "کۆنگرە گۆڕەپانی ئیرادەیە، نەک دەزگای ڕاگەیاندن",
      dek: "کۆنگرەی نیشتمانیی کوردستان شوێنی بڕیاری سیاسییە. ئەم ماڵپەڕە شوێنی وتارە.",
      caption: "وتارێک لەسەر جیاوازیی کۆنگرە و ماڵپەڕی وتار.",
      body: p(
        "کۆنگرەی نیشتمانیی کوردستان گۆڕەپانی کۆکردنەوەی ئیرادەی سیاسییە بۆ ڕزگاری و دەوڵەتسازی. کارەکەی دامەزراندنی دەوڵەتە: ئەقڵی دەوڵەت، دەستوور و دامەزراوە.",
        "> وتارێک لەسەر ئەم ماڵپەڕە بڕیاری کۆنگرە نییە. بۆچوونی کەسێکە کە بە کۆنگرەوە بەستراوە.",
        "خوێنەر لێرە وتار دەخوێنێتەوە، لەسەر گۆڕەپانی ئیرادەی سیاسی.",
      ),
    },
    kmr: {
      title: "Kongre qada îradeyê ye, ne dezgeha ragihandinê",
      dek: "Kongreya Niştimanî ya Kurdistanê cihê biryara siyasî ye. Ev malper cihê gotaran e.",
      caption: "Gotarek li ser cudahiya kongreyê û malpera gotaran.",
      body: p(
        "Kongreya Niştimanî ya Kurdistanê qada komkirina îradeya siyasî ye ji bo rizgarî û avakirina dewletê. Karê wê avakirina dewletê ye: aqilê dewletê, destûr û sazî.",
        "> Gotarek li ser vê malperê ne biryara kongreyê ye. Ramaneke kesekî ye ku bi kongreyê ve girêdayî ye.",
        "Xwîner li vir gotaran dixwîne, li ser qada îradeya siyasî.",
      ),
    },
    en: {
      title: "The congress is an arena of will, not a press office",
      dek: "The Kurdistan National Congress is a place of political decision. This site is a place for articles.",
      caption: "An article on the difference between the congress and the article site.",
      body: p(
        "The Kurdistan National Congress is the arena for gathering political will toward liberation and state formation. Its work is the formation of a state: state reason, a constitution, and institutions.",
        "> An article on this site is not a decision of the congress. It is the view of a person connected to the congress.",
        "Here the reader reads articles about the arena of political will.",
      ),
    },
  },
  "tembur-living": {
    category: "society",
    ckb: {
      title: "سوپای نیشتمانی وەک دامەزراوەی دەستووری",
      dek: "دەوڵەتێک کە شوێنی سوپا لە دەستووردا دیاری نەکات، دامەزراندنەکەی ناتەواوە. ئەمە وتارێکی یاساییە، نەک ڕێنماییی سەربازی.",
      caption: "پرسی سوپای نیشتمانی وەک دامەزراوە.",
      body: p(
        "سوپای نیشتمانی بۆ دەوڵەت دامەزراوەیە، وەک ئەنجومەن و دادگا و خەزێنە. پرسیارەکە سەربازی نییە لەم وتارەدا. پرسیارەکە دەستوورییە: سوپا هی دەوڵەتە، نەک هی حیزب؛ فەرمانەکەی لە یاساوە دێت؛ و سنوورەکەی لە دەقێکی گشتیدا دیارە.",
        "لە دەستووری نەرویج و لە دەستووری ئەمریکادا، هێزی چەکدار جێگەیەکی یاسایی هەیە، چونکە دامەزرێنەرەکان دەوڵەتیان بێ ئەو دامەزراوەیە تەواو نەدەزانی. خوێندنەوەی ئەمە بۆ کوردستان داواکاریی فیدراڵیزم نییە. داننانە بەوەی دەوڵەتسازی بێ دامەزراوەی بەرگری ناتەواوە.",
        "ئەم وتارە نە ڕێنماییە و نە ڕاگەیاندنی کۆنگرەیە. وتارێکە لەسەر شوێنی سوپای نیشتمانی لە ئەقڵی دەوڵەتدا.",
      ),
    },
    kmr: {
      title: "Artêşa niştimanî wek saziyeke destûrî",
      dek: "Dewleteke ku cihê artêşê di destûrê de diyar neke, avakirina wê nîvco ye. Ev gotara qanûnî ye, ne rêbernameya leşkerî.",
      caption: "Pirsê artêşa niştimanî wek sazî.",
      body: p(
        "Artêşa niştimanî ji bo dewletê sazî ye, wek encûmen, dadgeh û xezîne. Pirs di vê gotarê de ne leşkerî ye. Pirs destûrî ye: artêş ya dewletê ye, ne ya partiyê; ferman ji qanûnê tê; û sînorê wê di nivîseke giştî de diyar e.",
        "Di destûra Norwêcê û di destûra Amerîkayê de, hêza çekdar cîhekî qanûnî heye, ji ber ku avakarên dewletê dewletê bê wê saziyê temam nedidîtin. Xwendina vê ji bo Kurdistanê ne daxwaza federalîzmê ye. Danîn e ku avakirina dewletê bê saziyeke parastinê nîvco ye.",
        "Ev gotar ne rêbername ye û ne ragihandina kongreyê ye. Gotarek e li ser cihê artêşa niştimanî di aqilê dewletê de.",
      ),
    },
    en: {
      title: "A national army as a constitutional institution",
      dek: "A state that does not place the army in the constitution has not finished institutionalizing. This is a legal article, not a military manual.",
      caption: "The national army treated as an institution.",
      body: p(
        "A national army is an institution of the state, as an assembly, a court and a treasury are. The question in this article is not military. It is constitutional: the army belongs to the state, not to a party; its command comes from law; its limit is written in a public text.",
        "In the Norwegian constitution and in the constitution of the United States, armed force has a legal place, because the founders did not treat a state as complete without that institution. Reading this for Kurdistan is not a proposal of federalism. It is the recognition that state formation without an institution of defense is unfinished.",
        "This article is neither a manual nor a statement of the congress. It is an article on the place of a national army inside the reason of the state.",
      ),
    },
  },
  "highland-water": {
    category: "science",
    ckb: {
      title: "خاک وەک بابەتی یاسا، نەک وەک دیمەن",
      dek: "سەروەری لەسەر خاک چەمکێکی یاساییە. ئاو و سنوور و خەزێنە بابەتی دامەزراوەن.",
      caption: "خاکی کوردستان وەک بابەتی دەوڵەت.",
      body: p(
        "کاتێک باس لە ئاو و دەشت و سنوور دەکرێت، پرسیارە دروستەکە ئەوە نییە کە دیمەنەکە چەندە جوانە. پرسیارەکە ئەوەیە کام یاسا فەرمان لەسەر خاک دەدات. لە وڵاتێکی داگیرکراودا، یاساکە هی نەتەوەکە نییە. دەوڵەتسازی ئەو یاسایە دەگۆڕێت.",
        "دامەزراوەی خاک بریتییە لە تۆماری سنوور، دادگای موڵک، و دەسەڵاتێکی گشتی کە بڕیارەکەی یەک بێت. بەبێ ئەم دامەزراوانە، خاک هەر خاکە، بەڵام دەوڵەت نییە.",
        "## سەرچاوە\n\nئەم وتارە زانستییە و سەرچاوەکانی لە کۆتاییدان. بابەتەکە سەروەرییە، نەک جوگرافیای گەشتیاری.",
      ),
    },
    kmr: {
      title: "Ax wek mijara qanûnê, ne wek dîmen",
      dek: "Serwerî li ser axê têgeheke qanûnî ye. Av, sînor û xezîne mijarên saziyan in.",
      caption: "Axa Kurdistanê wek mijara dewletê.",
      body: p(
        "Dema behsa av, deşt û sînor tê kirin, pirs ne ew e ku dîmen çiqas xweşik e. Pirs ew e ka kîjan qanûn li ser axê ferman dide. Li welatekî dagirkirî, qanûn ne ya neteweyê ye. Avakirina dewletê wê qanûnê diguherîne.",
        "Saziyên axê ev in: tomara sînor, dadgeha milk, û desthilateke giştî ku biryara wê yek be. Bê van saziyan ax ax e, lê ne dewlet e.",
        "## Çavkanî\n\nEv gotara zanistî ye. Mijar serwerî ye, ne erdnîgariya geştiyariyê.",
      ),
    },
    en: {
      title: "Land as an object of law, not as a view",
      dek: "Sovereignty over territory is a legal concept. Water, borders and the treasury are matters for institutions.",
      caption: "The land of Kurdistan as a matter of state.",
      body: p(
        "When the subject is water, plain and border, the right question is not how fine the view is. The question is which law commands the territory. In an occupied country, that law is not the nation's. State formation changes the law.",
        "The institutions of territory are a border register, a property court, and a public authority whose decision is one decision. Without those institutions the land is still land, but it is not a state.",
        "## Sources\n\nThis is a scientific article. The subject is sovereignty, not travel writing.",
      ),
    },
  },
  "harvest-week": {
    category: "society",
    ckb: {
      title: "خەزێنە و دراو، دامەزراوەی سەربەخۆیی",
      dek: "دەوڵەت بێ خەزێنە و بێ یاسای دارایی تەنها ناوە. سەربەخۆیی لێرەدا دامەزراوەیە.",
      caption: "خەزێنە وەک دامەزراوەی دەوڵەت.",
      body: p(
        "دروێنە و بازاڕ کاتێک دەبنە بەشێک لە دەوڵەت کە بودجە، باج، گومرگ و دراو لە ژێر یاسایەکی گشتیدا بن. تا ئەو کاتە، ئابووری هەیە، بەڵام دامەزراوەی دەوڵەت نییە.",
        "دامەزرێنەرانی دەوڵەت لە شوێنەکانی تر سەرەتا پرسیان کرد کێ باج کۆدەکاتەوە و کێ خەرجی دەکات و لە ژێر کام دەقدا. هەمان پرسیار هی کوردستانە. وەڵامەکە فیدراڵیزم نییە. وەڵامەکە خەزێنەیەکی هی دەوڵەتی خۆیەتی.",
      ),
    },
    kmr: {
      title: "Xezîne û dirav, saziyên serxwebûnê",
      dek: "Dewlet bê xezîne û bê qanûna darayî tenê nav e. Serxwebûn li vir sazî ye.",
      caption: "Xezîne wek saziyeke dewletê.",
      body: p(
        "Dirûn û bazar dema dibin beşek ji dewletê ku budçe, bac, gumrik û dirav di bin qanûneke giştî de bin. Heta wê demê aborî heye, lê saziyên dewletê tune ne.",
        "Avakarên dewletê li cihên din pêşî pirsîn ka kî bacê kom dike û kî xerc dike û di bin kîjan nivîsê de. Heman pirs ya Kurdistanê ye. Bersiv ne federalîzm e. Bersiv xezîneyeke dewleta xwe ye.",
      ),
    },
    en: {
      title: "Treasury and currency, institutions of independence",
      dek: "A state without a treasury and a public finance law is only a name. Independence here is an institution.",
      caption: "The treasury as an institution of the state.",
      body: p(
        "A harvest and a market become part of a state when budget, tax, customs and currency sit under one public law. Until then there is an economy, but not the institutions of a state.",
        "Those who founded states elsewhere asked first who collects, who spends, and under which text. That question belongs to Kurdistan. The answer is not federalism. The answer is a treasury of its own state.",
      ),
    },
  },
  "two-alphabets": {
    category: "science",
    ckb: {
      title: "نووسینی دەستوور، یەکەم دەقی دەوڵەت",
      dek: "دەوڵەت بە دەقێکی بنەڕەتی دەست پێدەکات. دەستوور گوتاری ئەقڵی دەوڵەتە کاتێک دەبێتە یاسا.",
      caption: "دەستوور وەک دەقی دامەزراندن.",
      body: p(
        "دەستوور شیعر نییە و دروشم نییە. دەقێکە کە دەڵێت دەسەڵات لە کوێوە دێت، کێ یاسا دادەنێت، دادگا چۆنە، خەزێنە هی کێیە، و سوپا لە ژێر کام فەرماندایە. بێ ئەم دەقە، دامەزراوەکان ناویان هەیە و بنەمایان نییە.",
        "ڕێگاکە لە ئەزموونی دەستپێکی دەوڵەتانەوە دەخوێندرێتەوە. ئەنجومەنێکی دامەزرێنەر، گفتوگۆیەکی گشتی، دەقێک، و پەسەندکردن. نەرویجی ١٨١٤ و گفتوگۆی دامەزراندنی ئەمریکا لێرەدا وەک ڕێباز دەخوێندرێنەوە، نەک وەک نەخشەی سیاسی بۆ کوردستان. ئامانجی کوردستان سەربەخۆیی و دەوڵەتی خۆیەتی.",
        "## سەرچاوە\n\nسەرچاوەکان بۆ مێژووی دەستوورن، نەک بۆ وەرگرتنی شێوەی کەسێکی تر.",
      ),
    },
    kmr: {
      title: "Nivîsandina destûrê, nivîsa yekem a dewletê",
      dek: "Dewlet bi nivîseke bingehîn dest pê dike. Destûr gotara aqilê dewletê ye dema dibe qanûn.",
      caption: "Destûr wek nivîsa avakirinê.",
      body: p(
        "Destûr ne helbest e û ne slogan e. Nivîsek e ku dibêje desthilat ji ku tê, kî qanûnê datîne, dadgeh çawa ye, xezîne ya kê ye, û artêş di bin kîjan fermanê de ye. Bê vê nivîsê sazî navê wan heye û bingeha wan tune.",
        "Rê ji ezmûna destpêka dewletan tê xwendin. Encûmeneke avakar, gotûbêjeke giştî, nivîsek, û pejirandin. Norwêca 1814an û gotûbêja avakirina Amerîkayê li vir wek rêbaz têne xwendin, ne wek nexşeya siyasî ji bo Kurdistanê. Armanca Kurdistanê serxwebûn û dewleta xwe ye.",
        "## Çavkanî\n\nÇavkanî ji bo dîroka destûrê ne, ne ji bo wergirtina şeklê kesekî din.",
      ),
    },
    en: {
      title: "Writing the constitution, the first text of a state",
      dek: "A state begins in a basic text. A constitution is state reason once it has become law.",
      caption: "A constitution as a founding text.",
      body: p(
        "A constitution is not a poem and not a slogan. It is a text that says where authority comes from, who makes law, what a court is, whose the treasury is, and under whose command the army stands. Without that text, institutions have names and no foundation.",
        "The method is read from how states began. A constituent assembly, a public argument, a text, and adoption. Norway in 1814 and the American founding debate are read here as method, not as a political map for Kurdistan. The aim for Kurdistan is independence and its own state.",
        "## Sources\n\nThe references are for the history of constitutions, not for copying someone else's form.",
      ),
    },
  },
  "bazaar-evening": {
    category: "society",
    ckb: {
      title: "یاسای بازرگانی وەک دامەزراوە",
      dek: "بازاڕ بێ یاسای گومرگ و گرێبەست نابێتە بەشێک لە دەوڵەت.",
      caption: "یاسای ئابووری، نەک وەسفی بازاڕ.",
      body: p(
        "بازاڕ شوێنی نرخە، بەڵام نرخ بێ دامەزراوە سەروەری نییە. دەوڵەت پێویستی بە یاسای گرێبەست، گومرگ، و دەسەڵاتێک هەیە کە یەک پێوەر بۆ هەموو خاکەکە دابنێت.",
        "ئەمە وەسفی ژیانی بازاڕ نییە. وتارێکە لەسەر ئەوەی ئابووریی نیشتمانی چۆن دەبێتە دامەزراوە. تا ئەو دامەزراوەیە نەبێت، سەربەخۆیی لە سنووردا ناخرێتە بواری جێبەجێکردنەوە.",
      ),
    },
    kmr: {
      title: "Qanûna bazirganiyê wek sazî",
      dek: "Bazar bê qanûna gumrik û peymanê nabe beşek ji dewletê.",
      caption: "Qanûna aboriyê, ne wesfa bazarê.",
      body: p(
        "Bazar cihê bihayê ye, lê biha bê sazî ne serwerî ye. Dewlet qanûna peymanê, gumrikê, û desthilatekê dixwaze ku yek pîvan ji bo hemû axê deyne.",
        "Ev ne wesfa jiyana bazarê ye. Gotarek e li ser ka aboriya neteweyî çawa dibe sazî. Heta ew sazî tune be, serxwebûn li sînor nayê cîbicîkirin.",
      ),
    },
    en: {
      title: "Commercial law as an institution",
      dek: "A market without customs and contract law does not become part of a state.",
      caption: "Economic law, not a sketch of the bazaar.",
      body: p(
        "A market is where price lives, but price without institutions is not sovereignty. A state needs a law of contract, a customs authority, and one standard for the whole territory.",
        "This is not a sketch of market life. It is an article on how a national economy becomes an institution. Until that institution exists, independence is not carried out at the border.",
      ),
    },
  },
  "library-hour": {
    category: "politics",
    ckb: {
      title: "ئەرشیفی بڕیار، بیرەوەریی دەوڵەت",
      dek: "ئەرشیف ئەگەر تەنها کەلتوور بێت، دەوڵەت دروست ناکات. ئەرشیفی بڕیار بەشێکە لە ئەقڵی دەوڵەتی.",
      caption: "ئەرشیفی بڕیارە سیاسییەکان.",
      body: p(
        "دەوڵەت بیرەوەریی خۆی لە بڕیارەکانیدا هەیە، نەک تەنها لە شیعر و گۆرانیدا. تۆماری ئەنجومەن، دەقی یاسا، و ڕەشنووسی دەستوور ئەرشیفێکن کە نەتەوە پێی دەزانێت چۆن فێری دەوڵەت بووە.",
        "کۆنگرەی نیشتمانیی کوردستان ئەگەر بڕیارەکانی تۆمار نەکات، گۆڕەپان نامێنێت و دەبێتە یادەوەرییەکی بێ دەق. ئەم وتارە داوا لە خوێنەر دەکات جیاوازی بکات لە نێوان ئەرشیفی کەلتوور و ئەرشیفی دامەزراندن.",
      ),
    },
    kmr: {
      title: "Arşîva biryarê, bîra dewletê",
      dek: "Arşîv heke tenê çand be, dewletê çê nake. Arşîva biryarê beşek e ji aqilê dewletê.",
      caption: "Arşîva biryarên siyasî.",
      body: p(
        "Dewlet bîra xwe di biryarên xwe de heye, ne tenê di helbest û stranê de. Tomara encûmenê, nivîsa qanûnê, û rejeya destûrê arşîvek in ku netewe pê dizane çawa hînî dewletê bûye.",
        "Kongreya Niştimanî ya Kurdistanê heke biryarên xwe tomar neke, qad namîne û dibe bîrek bê nivîs. Ev gotar ji xwîner dixwaze cudahiyê bike di navbera arşîva çandê û arşîva avakirinê de.",
      ),
    },
    en: {
      title: "The archive of decisions, the memory of a state",
      dek: "An archive that is only culture does not found a state. An archive of decisions is part of state reason.",
      caption: "An archive of political decisions.",
      body: p(
        "A state keeps its memory in its decisions, not only in poems and songs. The record of an assembly, the text of a law, and the draft of a constitution are the archive through which a nation knows how it learned to be a state.",
        "If the Kurdistan National Congress does not record its decisions, it stops being an arena and becomes a memory without a text. This article asks the reader to distinguish an archive of culture from an archive of institutionalization.",
      ),
    },
  },
  "evening-routes": {
    category: "kurdistan",
    ckb: {
      title: "یەک وڵات، یەک کۆنگرە، یەک پرۆژەی دەوڵەت",
      dek: "باکوور، باشوور، ڕۆژهەڵات و ڕۆژاوا چوار پارچەی یەک وڵاتی داگیرکراون. کۆنگرە گۆڕەپانی یەک پرۆژەی دەوڵەتە.",
      caption: "چوار پارچە، یەک پرۆژەی دەوڵەت.",
      body: p(
        "سنوورەکانی ئێستا نەخشەی نەتەوەکە نین. نەخشەی داگیرکردنن. کۆنگرەی نیشتمانیی کوردستان بۆ ئەوەیە ئیرادەی ئەم پارچانە لە یەک گۆڕەپاندا کۆبکاتەوە، بۆ سەربەخۆیی و بۆ دامەزراندنی دەوڵەت.",
        "کۆنگرەی نیشتمانیی کوردستان گۆڕەپانی ئەم کارەیە. لێرە کارەکە دەوڵەتسازییە، بە ئەقڵی دەوڵەت و دەستوور و دامەزراوە.",
        "ئەم وتارە بۆ خوێنەری گشتییە، لەسەر یەک وڵات و یەک پرۆژەی دەوڵەت.",
      ),
    },
    kmr: {
      title: "Yek welat, yek kongre, yek projeya dewletê",
      dek: "Bakur, Başûr, Rojhilat û Rojava çar parçeyên yek welatê dagirkirî ne. Kongre qada yek projeya dewletê ye.",
      caption: "Çar parçe, yek projeya dewletê.",
      body: p(
        "Sînorên niha nexşeya neteweyê nînin. Nexşeya dagirkirinê ne. Kongreya Niştimanî ya Kurdistanê ji bo wê ye ku îradeya van parçeyan di yek qadê de kom bike, ji bo serxwebûnê û ji bo avakirina dewletê.",
        "Kongreya Niştimanî ya Kurdistanê qada vî karî ye. Li vir kar avakirina dewletê ye, bi aqilê dewletê, destûr û saziyan.",
        "Ev gotar ji bo xwînerê giştî ye, li ser yek welat û yek projeya dewletê.",
      ),
    },
    en: {
      title: "One country, one congress, one project of a state",
      dek: "North, south, east and west are four parts of one occupied country. The congress is the arena of one project of a state.",
      caption: "Four parts, one project of a state.",
      body: p(
        "The present borders are not the map of the nation. They are the map of occupation. The Kurdistan National Congress exists to gather the will of these parts in one arena, for independence and for the institutionalization of a state.",
        "The Kurdistan National Congress is the arena of this work. Here the work is state formation, through state reason, a constitution, and institutions.",
        "This article is for the general reader, on one country and one project of a state.",
      ),
    },
  },
};

const categories: Record<string, Record<string, string>> = {
  kurdistan: {
    ckb: "کوردستانی داگیرکراو", kmr: "Kurdistana dagirkirî", en: "Occupied Kurdistan",
    ar: "كردستان المحتلة", fa: "کردستان اشغالی", tr: "İşgal altındaki Kürdistan",
    de: "Besetztes Kurdistan", fr: "Kurdistan occupé", es: "Kurdistán ocupado",
  },
  politics: {
    ckb: "ئەقڵی دەوڵەت", kmr: "Aqilê dewletê", en: "State reason",
    ar: "عقل الدولة", fa: "عقل دولت", tr: "Devlet aklı",
    de: "Staatsvernunft", fr: "Raison d'État", es: "Razón de Estado",
  },
  culture: {
    ckb: "دامەزراوە", kmr: "Sazî", en: "Institutions",
    ar: "المؤسسات", fa: "نهادها", tr: "Kurumlar",
    de: "Institutionen", fr: "Institutions", es: "Instituciones",
  },
  science: {
    ckb: "دەستوور", kmr: "Destûr", en: "Constitution",
    ar: "الدستور", fa: "قانون اساسی", tr: "Anayasa",
    de: "Verfassung", fr: "Constitution", es: "Constitución",
  },
  society: {
    ckb: "دەوڵەتسازی", kmr: "Avakirina dewletê", en: "State formation",
    ar: "بناء الدولة", fa: "دولت‌سازی", tr: "Devletleşme",
    de: "Staatsbildung", fr: "Formation de l'État", es: "Formación del Estado",
  },
  opinion: {
    ckb: "بۆچوون", kmr: "Raman", en: "Opinion",
    ar: "رأي", fa: "دیدگاه", tr: "Görüş",
    de: "Meinung", fr: "Opinion", es: "Opinión",
  },
};

const staff: Record<string, { title: Record<string, string>; bio: Record<string, string> }> = {
  "staff:ava": {
    title: { ckb: "نووسەری ئەقڵی دەوڵەت", kmr: "Nivîskara aqilê dewletê", en: "Writer on state reason" },
    bio: {
      ckb: "ئافا حەمە وتار دەنووسێت لەسەر ئەقڵی دەوڵەت. بە کۆنگرەی نیشتمانیی کوردستانەوە بەستراوە.",
      kmr: "Ava Heme li ser aqilê dewletê dinivîse. Bi Kongreya Niştimanî ya Kurdistanê ve girêdayî ye.",
      en: "Ava Hama writes on state reason. She is connected to the Kurdistan National Congress.",
    },
  },
  "staff:diyar": {
    title: { ckb: "نووسەری دامەزراوە", kmr: "Nivîskarê saziyan", en: "Writer on institutions" },
    bio: {
      ckb: "دیار عوسمان لەسەر دامەزراندنی دەوڵەت دەنووسێت: دادگا، خەزێنە، تۆمار.",
      kmr: "Diyar Osman li ser avakirina dewletê dinivîse: dadgeh, xezîne, tomar.",
      en: "Diyar Osman writes on institutionalization: courts, treasury, records.",
    },
  },
  "staff:rojin": {
    title: { ckb: "نووسەری دەستوور", kmr: "Nivîskara destûrê", en: "Writer on the constitution" },
    bio: {
      ckb: "ڕۆژین باران لەسەر نووسینی دەستوور و جیاوازیی بەڕێوەبردن و دامەزراندن دەنووسێت.",
      kmr: "Rojîn Baran li ser nivîsandina destûrê dinivîse.",
      en: "Rojin Baran writes on constitution-making and on the difference between administration and institutionalization.",
    },
  },
  "staff:sherko": {
    title: { ckb: "ستوونی دەوڵەتسازی", kmr: "Stûna avakirina dewletê", en: "Columnist on state formation" },
    bio: {
      ckb: "شێرکۆ میران بۆچوون دەنووسێت لەسەر دەوڵەتسازی. کوردستان وەک وڵاتێکی داگیرکراو، و کۆنگرە وەک گۆڕەپانی ئەو کارە.",
      kmr: "Şêrko Mîran li ser avakirina dewletê dinivîse. Kurdistan welatekî dagirkirî ye, û kongre qada wî karî ye.",
      en: "Sherko Miran writes on state formation. He treats Kurdistan as an occupied country, and the congress as the arena of that work.",
    },
  },
};

type MenuSeed = { label: string; href: string; mega?: boolean; children?: { label: string; href: string }[] };

const menus: Record<string, MenuSeed[]> = {
  ckb: [
    { label: "ئەقڵی دەوڵەت", href: "/section/politics", mega: true, children: [
      { label: "لە کوێوە دەست پێدەکات", href: "/article/citadel-memory" },
      { label: "ئەرشیفی بڕیار", href: "/article/library-hour" },
      { label: "هەموو بەش", href: "/section/politics" },
    ] },
    { label: "دامەزراوە", href: "/section/culture", mega: true, children: [
      { label: "دامەزراندن", href: "/article/civic-decade" },
      { label: "هەموو بەش", href: "/section/culture" },
    ] },
    { label: "دەستوور", href: "/section/science", mega: true, children: [
      { label: "زانستی دەوڵەت", href: "/article/digital-corpus" },
      { label: "نووسینی دەستوور", href: "/article/two-alphabets" },
      { label: "خاک و یاسا", href: "/article/highland-water" },
    ] },
    { label: "دەوڵەتسازی", href: "/section/society", mega: true, children: [
      { label: "سوپای نیشتمانی", href: "/article/tembur-living" },
      { label: "خەزێنە", href: "/article/harvest-week" },
      { label: "یاسای بازرگانی", href: "/article/bazaar-evening" },
    ] },
    { label: "کوردستان", href: "/section/kurdistan", mega: false },
    { label: "بۆچوون", href: "/section/opinion", mega: false },
  ],
  kmr: [
    { label: "Aqilê dewletê", href: "/section/politics", mega: true, children: [
      { label: "Destpêk", href: "/article/citadel-memory" },
      { label: "Arşîva biryarê", href: "/article/library-hour" },
    ] },
    { label: "Sazî", href: "/section/culture", mega: true, children: [
      { label: "Avakirin", href: "/article/civic-decade" },
    ] },
    { label: "Destûr", href: "/section/science", mega: true, children: [
      { label: "Zanista dewletê", href: "/article/digital-corpus" },
      { label: "Nivîsandina destûrê", href: "/article/two-alphabets" },
    ] },
    { label: "Dewlet", href: "/section/society", mega: true, children: [
      { label: "Artêş", href: "/article/tembur-living" },
      { label: "Xezîne", href: "/article/harvest-week" },
    ] },
    { label: "Kurdistan", href: "/section/kurdistan" },
    { label: "Raman", href: "/section/opinion" },
  ],
  en: [
    { label: "State reason", href: "/section/politics", mega: true, children: [
      { label: "Where it begins", href: "/article/citadel-memory" },
      { label: "Archive of decisions", href: "/article/library-hour" },
    ] },
    { label: "Institutions", href: "/section/culture", mega: true, children: [
      { label: "Institutionalization", href: "/article/civic-decade" },
    ] },
    { label: "Constitution", href: "/section/science", mega: true, children: [
      { label: "Science of the state", href: "/article/digital-corpus" },
      { label: "Writing the constitution", href: "/article/two-alphabets" },
    ] },
    { label: "State formation", href: "/section/society", mega: true, children: [
      { label: "National army", href: "/article/tembur-living" },
      { label: "Treasury", href: "/article/harvest-week" },
    ] },
    { label: "Kurdistan", href: "/section/kurdistan" },
    { label: "Opinion", href: "/section/opinion" },
  ],
};

const pages: Record<string, Record<string, { title: string; body: string }>> = {
  about: {
    ckb: {
      title: "دەربارە",
      body: p(
        "ئەم ماڵپەڕە ماڵپەڕی وتارە. وتارەکان هی کەسانێکن کە بە کۆنگرەی نیشتمانیی کوردستانەوە بەستراون.",
        "کۆنگرەی نیشتمانیی کوردستان گۆڕەپانی بڕیاری سیاسییە بۆ ڕزگاریی کوردستان و بۆ دامەزراندنی دەوڵەت. کارەکە لە ئەقڵی دەوڵەت، دەستوور و دامەزراوەوە دەڕوات.",
        "kncsite.com و kurdistankongress.com و kurdistankongress.net و kurdistankongress.org.",
      ),
    },
    kmr: {
      title: "Derbar",
      body: p(
        "Ev malper malpera gotaran e. Gotar yên kesên ku bi Kongreya Niştimanî ya Kurdistanê ve girêdayî ne.",
        "Kongreya Niştimanî ya Kurdistanê qada biryara siyasî ye ji bo rizgariya Kurdistanê û avakirina dewletê. Kar bi aqilê dewletê, destûr û saziyan diçe.",
        "kncsite.com, kurdistankongress.com, kurdistankongress.net, kurdistankongress.org.",
      ),
    },
    en: {
      title: "About",
      body: p(
        "This is an article site. The articles are by people connected to the Kurdistan National Congress.",
        "The Kurdistan National Congress is the arena of political decision for the liberation of Kurdistan and the formation of a state. The work runs through state reason, a constitution, and institutions.",
        "kncsite.com, kurdistankongress.com, kurdistankongress.net, kurdistankongress.org.",
      ),
    },
  },
  ethics: {
    ckb: {
      title: "ڕەوشت",
      body: p(
        "ناوەکان ڕاست دەنووسرێن. بڕیار و وتار تێکەڵ ناکرێن.",
        "ناوەکان ڕاست دەنووسرێن: کۆنگرەی نیشتمانیی کوردستان، KNC.",
        "ئامانج سەربەخۆیی و دەوڵەتسازییە. فیدراڵیزم و ئۆتۆنۆمی بەرنامەی ئەم وتارانە نین. هەڵە لە پەڕەی ڕاستکردنەوەدا ڕاست دەکرێتەوە.",
      ),
    },
    kmr: {
      title: "Exlaq",
      body: p(
        "Nav rast tên nivîsandin. Biryar û gotar tevlihev nabin.",
        "Nav rast tên nivîsandin: Kongreya Niştimanî ya Kurdistanê, KNC.",
        "Armanc serxwebûn û avakirina dewletê ye. Federalîzm û otonomî bernameya van gotaran nînin.",
      ),
    },
    en: {
      title: "Ethics",
      body: p(
        "Names are written correctly. Decisions and articles are not mixed.",
        "Names are written correctly: the Kurdistan National Congress, KNC.",
        "The aim is independence and state formation. Federalism and autonomy are not the program of these articles. Errors are corrected on the corrections page.",
      ),
    },
  },
};

const stateRefs = [
  { authors: "Hamilton, A.", year: "1787", title: "Federalist No. 1", source: "The Federalist Papers" },
  { authors: "Weber, M.", year: "1919", title: "Politics as a Vocation", source: "Munich lecture" },
  { authors: "Kingdom of Norway", year: "1814", title: "The Constitution of the Kingdom of Norway", source: "Eidsvoll, 17 May 1814" },
];

const images: Record<string, string> = {
  "citadel-memory": "/media/state-reason.jpg",
  "civic-decade": "/media/institutions.jpg",
  "digital-corpus": "/media/archive.jpg",
  "tea-square": "/media/congress.jpg",
  "tembur-living": "/media/institution-flag.jpg",
  "highland-water": "/media/territory.jpg",
  "harvest-week": "/media/treasury.jpg",
  "two-alphabets": "/media/constitution.jpg",
  "bazaar-evening": "/media/customs.jpg",
  "library-hour": "/media/books.jpg",
  "evening-routes": "/media/one-country.jpg",
};

const filesFor: Record<string, { name: string; url: string }[]> = {
  "two-alphabets": [{ name: "Nivîsandina destûrê.pdf", url: "/publications/destur.pdf" }],
  "digital-corpus": [{ name: "Aqilê dewletê.pdf", url: "/publications/aqil.pdf" }],
  "civic-decade": [{ name: "Saziyên dewletê.pdf", url: "/publications/sazi.pdf" }],
};

export async function applyEditorial(sql: Sql): Promise<void> {
  for (const [slug, name] of Object.entries(categories)) {
    await sql`update categories set name = ${JSON.stringify(name)} where slug = ${slug}`;
  }
  for (const [group, story] of Object.entries(stories)) {
    const refs = story.category === "science" ? JSON.stringify(stateRefs) : null;
    for (const lang of ["ckb", "kmr", "en"] as const) {
      const copy = story[lang];
      if (refs) {
        await sql`
          update articles set
            title = ${copy.title},
            dek = ${copy.dek},
            body = ${copy.body},
            image = ${images[group] ?? ""},
            image_caption = ${copy.caption},
            category_slug = ${story.category},
            type = 'scientific',
            refs = ${refs},
            files = ${JSON.stringify(filesFor[group] ?? [])},
            updated_at = now()
          where group_key = ${group} and lang = ${lang}
        `;
      } else {
        await sql`
          update articles set
            title = ${copy.title},
            dek = ${copy.dek},
            body = ${copy.body},
            image = ${images[group] ?? ""},
            image_caption = ${copy.caption},
            category_slug = ${story.category},
            files = ${JSON.stringify(filesFor[group] ?? [])},
            updated_at = now()
          where group_key = ${group} and lang = ${lang}
      `;
      }
      const found = await sql<{ id: number }>`
        select id from articles where group_key = ${group} and lang = ${lang}
      `;
      const id = found[0]?.id;
      if (id) {
        await sql`delete from placements where article_id = ${id} and zone like 'section:%'`;
        await sql`
          insert into placements (article_id, zone) values (${id}, ${`section:${story.category}`})
          on conflict do nothing
        `;
      }
    }
  }
  for (const [id, person] of Object.entries(staff)) {
    const rows = await sql<{ title: string; bio: string }>`
      select title, bio from profiles where user_id = ${id}
    `;
    const row = rows[0];
    if (!row) continue;
    const title = { ...asJson<Record<string, string>>(row.title, {}), ...person.title };
    const bio = { ...asJson<Record<string, string>>(row.bio, {}), ...person.bio };
    await sql`update profiles set title = ${JSON.stringify(title)}, bio = ${JSON.stringify(bio)} where user_id = ${id}`;
  }
  for (const [slug, copy] of Object.entries(pages)) {
    for (const [lang, page] of Object.entries(copy)) {
      await sql`
        update pages set title = ${page.title}, body = ${page.body}, updated_at = now()
        where slug = ${slug} and lang = ${lang}
      `;
    }
  }
  await sql`delete from wires`;
  const wires = [
    { lang: "ckb", kicker: "دەستوور", text: "دەوڵەت بە دەقێکی بنەڕەتی دەست پێدەکات: ئەنجومەن، یاسا، خەزێنە و شوێنی سوپا لە دەستووردا.", href: "/article/two-alphabets", urgent: true },
    { lang: "ckb", kicker: "KNC", text: "کۆنگرەی نیشتمانیی کوردستان گۆڕەپانی دەوڵەتسازییە.", href: "/article/tea-square", urgent: false },
    { lang: "ckb", kicker: "دامەزراوە", text: "بەڕێوەبردن لەسەر خاکی داگیرکراو دەوڵەت نییە. دامەزراندن یاسای نەتەوەکەیە.", href: "/article/civic-decade", urgent: false },
    { lang: "kmr", kicker: "Destûr", text: "Dewlet bi nivîseke bingehîn dest pê dike.", href: "/article/two-alphabets", urgent: true },
    { lang: "en", kicker: "Constitution", text: "A state begins in a basic text: assembly, law, treasury, and the army's place in the constitution.", href: "/article/two-alphabets", urgent: true },
    { lang: "en", kicker: "KNC", text: "The Kurdistan National Congress is an arena of state formation.", href: "/article/tea-square", urgent: false },
    { lang: "en", kicker: "Institutions", text: "Administration on occupied land is not a state. Institutionalization is the nation's own law.", href: "/article/civic-decade", urgent: false },
  ];
  for (const line of wires) {
    await sql`
      insert into wires (lang, kicker, text, href, urgent, active)
      values (${line.lang}, ${line.kicker}, ${line.text}, ${line.href}, ${line.urgent}, true)
    `;
  }
  await sql`delete from events`;
  const events = [
    { offset: 4, lang: "ckb", title: "گفتوگۆی دەستوور", place: "هەولێر", detail: "نووسەران لەسەر دەقی بنەڕەتی و دامەزراوە دادەنیشن." },
    { offset: 9, lang: "ckb", title: "ئەقڵی دەوڵەت", place: "سلێمانی", detail: "خوێندنەوەیەک لەسەر چەمکی سەروەری، هاوڵاتی و دامەزراوە." },
    { offset: 14, lang: "en", title: "A reading on the constitution", place: "Hewlêr", detail: "Writers sit with the question of a basic text and the institutions of a state." },
    { offset: 6, lang: "kmr", title: "Aqilê dewletê", place: "Silêmanî", detail: "Xwendineke li ser serwerî, hemwelatî û saziyan." },
  ];
  for (const event of events) {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() + event.offset);
    await sql`
      insert into events (lang, title, place, starts_on, detail)
      values (${event.lang}, ${event.title}, ${event.place}, ${date.toISOString().slice(0, 10)}, ${event.detail})
    `;
  }
}

export async function ensureNavTable(sql: Sql): Promise<void> {
  await sql`
    create table if not exists nav_items (
      id serial primary key,
      lang text not null,
      label text not null,
      href text not null default '',
      parent_id int,
      sort int not null default 0,
      mega boolean not null default false
    )
  `;
}

export async function ensureMenus(sql: Sql): Promise<void> {
  await ensureNavTable(sql);
  const existing = await sql<{ n: number }>`select count(*)::int as n from nav_items`;
  if ((Number(existing[0]?.n) || 0) > 0) return;
  for (const [lang, items] of Object.entries(menus)) {
    let sort = 0;
    for (const item of items) {
      sort += 1;
      const inserted = await sql<{ id: number }>`
        insert into nav_items (lang, label, href, parent_id, sort, mega)
        values (${lang}, ${item.label}, ${item.href}, ${null}, ${sort}, ${Boolean(item.mega)})
        returning id
      `;
      const parent = inserted[0]?.id;
      if (!parent) continue;
      let childSort = 0;
      for (const child of item.children ?? []) {
        childSort += 1;
        await sql`
          insert into nav_items (lang, label, href, parent_id, sort, mega)
          values (${lang}, ${child.label}, ${child.href}, ${parent}, ${childSort}, ${false})
        `;
      }
    }
  }
}

export type MenuNode = {
  id: number;
  label: string;
  href: string;
  mega: boolean;
  children: { id: number; label: string; href: string }[];
};

export function nestMenu(rows: { id: number; label: string; href: string; parent_id: number | null; sort: number; mega: boolean }[]): MenuNode[] {
  const tops = rows.filter((row) => !row.parent_id).sort((a, b) => a.sort - b.sort);
  return tops.map((top) => ({
    id: top.id,
    label: top.label,
    href: top.href,
    mega: Boolean(top.mega) || rows.some((row) => row.parent_id === top.id),
    children: rows
      .filter((row) => row.parent_id === top.id)
      .sort((a, b) => a.sort - b.sort)
      .map((row) => ({ id: row.id, label: row.label, href: row.href })),
  }));
}
