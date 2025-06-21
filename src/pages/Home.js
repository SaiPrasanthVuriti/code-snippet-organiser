import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../service/config";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";

import List from "../components/List";
import Creator from "../components/Creator";

import { getTagList, readData } from "../service/crud";

import { langParse1 } from "../functions/langParse";

const Home = () => {
  const allLangList = [
    "JavaScript",
    "TypeScript",
    "python",
    "HTML",
    "CSS",
    "JSON",
    "SQL",
    "Markdown",
    "Java",
    "C/C++",
  ];

  const [docList, setlist] = useState([]);
  const [allTagList, setAllTagList] = useState([]);

  const [mycode, setmycode] = useState(false);
  const [myTrash, setMyTrash] = useState(false);

  const [search, setSearch] = useState("");
  const [langText, setLangText] = useState("");
  const [tagText, setTagText] = useState("");
  const [userid, setId] = useState("");

  const [filterTags, setFilterTags] = useState([]);
  const [filterLang, setFilterLang] = useState([]);

  const [sort, setSort] = useState("");
  const [edit, setEdit] = useState("");

  useEffect(() => {
    const handledata = async () => {
      try {
        const list = await readData();
        setlist(list);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchTags = async () => {
      try {
        const allTags = await getTagList();
        setAllTagList(allTags);
        // console.log(allTags);
      } catch (err) {
        console.log(err);
      }
    };

    const handleAuth = async () => {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setId(user.uid);
          } else {
            console.log("User is signed out");
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    const unsub = onSnapshot(collection(db, "snippets"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setlist(data);
    });
    handleAuth();
    fetchTags();
    handledata();
    return () => unsub();
  }, []);
  const langSuggestions = allLangList.filter((lang) => {
    return lang.toLowerCase().includes(langText.toLowerCase());
  });
  const tagSuggestions = allTagList.filter((tag) => {
    return tag.label.toLowerCase().includes(tagText.toLowerCase());
  });
  const removeLang = (index) => {
    const updtaedlang = filterLang.filter((tag, i) => i !== index);
    setFilterLang(updtaedlang);
  };

  const toggleLang = (label) => {
    setFilterLang((prev) =>
      prev.includes(label)
        ? prev.filter((taglabel) => taglabel !== label)
        : [...prev, label]
    );
  };
  const toggleTag = (label) => {
    setFilterTags((prev) =>
      prev.includes(label)
        ? prev.filter((taglabel) => taglabel !== label)
        : [...prev, label]
    );
  };

  const highlightMatch = (text, indices) => {
    const parts = [];
    let lastIndex = 0;

    indices.forEach(([start, end], i) => {
      if (start > lastIndex) {
        parts.push(text.slice(lastIndex, start));
      }
      parts.push(<mark key={i}>{text.slice(start, end + 1)}</mark>);
      lastIndex = end + 1;
    });

    parts.push(text.slice(lastIndex));
    return parts;
  };

  const viewList = () => {
    let list = docList;
    // console.log(userid);
    if (mycode) {
      list = docList.filter((element) => element.userid === userid);
      if (myTrash) {
        list = list.filter((element) => element.inTrash);
      } else {
        list = list.filter((element) => !element.inTrash);
      }
    }
    if (!mycode) {
      list = docList.filter((element) => element.viewAll);
    }
    if (filterLang.length !== 0) {
      list = docList.filter((element) => {
        return filterLang.includes(langParse1(element.lang));
      });
    }
    if (filterTags.length !== 0) {
      list = list.filter(
        (element) =>
          Array.isArray(element.tag) &&
          element.tag.some((tag) =>
            filterTags.some((filterTag) =>
              tag.toLowerCase().includes(filterTag.toLowerCase())
            )
          )
      );
    }

    if (search !== "") {
      const fuse = new Fuse(list, {
        keys: ["title", "description", "code"],
        threshold: 0.3,
        includeMatches: true,
      });

      const results = fuse.search(search);

      const newlist = results.map((result) => {
        const { item, matches } = result;

        let highlightedTitle = item.title;
        let highlightedDescription = item.description;
        let highlightedCode = item.code;

        matches.forEach(({ key, indices }) => {
          if (key === "title")
            highlightedTitle = highlightMatch(item[key], indices);
          if (key === "description")
            highlightedDescription = highlightMatch(item[key], indices);
          if (key === "code")
            highlightedCode = highlightMatch(item[key], indices);
        });

        return {
          userid: item.userid,
          title: highlightedTitle,
          description: highlightedDescription,
          lang: item.lang,
          tag: item.tag,
          code: highlightedCode,
          createTime: item.createTime,
          isFav: item.isFav,
          inTrash: item.inTrash,
          viewAll: item.viewAll,
        };
      });

      list = newlist;
    }
    if (sort === "recent") {
      list.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
    } else if (sort === "fav") {
      list.sort((a, b) => Number(b.isFav) - Number(a.isFav));
    } else if (sort === "lang") {
      list.sort((a, b) => a.lang.localeCompare(b.lang));
    }

    return list;
  };

  return (
    <div className="home">
      <div className="list">
        <div className="homeTop-light">
          <div className="homebuttons-light">
            <button
              className="topbuttons-light"
              onClick={() => {
                setmycode(!mycode);
              }}
            >
              {mycode?"Show all codes":"Show my codes"}
            </button>
            {mycode && (
              <button
                className="topbuttons-light"
                onClick={() => {
                  setMyTrash(!myTrash);
                }}
              >
                   {myTrash?" show Trash":"My codes"}
              </button>
            )}
          </div>

          <div className="searchSortBox-light">
            
         <div  className="searchSortBox-light">
          <p className="headings">search : </p>
            <input
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="searchInput-light"
            /></div>
            <div className="sortBox-light">
              <label className="headings">sort </label>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              >
                <option value="recent">Recent</option>
                {mycode && <option value="fav">Favorite</option>}
                <option value="lang">Language</option>
              </select>
            </div>
          </div>

          <div className="filterBox-light">
            <p className="headings">Filters :</p>

            <div className="suggestionBox-light">
              <input
                onChange={(e) => {
                  setLangText(e.target.value);
                }}
                type="text"
                className="searchInput-light"
              />
              <div>
                {filterLang.map((lang, index) => (
                  <div key={lang}>
                    <p>{lang}</p>
                    <button
                      onClick={() => {
                        removeLang(index);
                      }}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>

              <div className="suggestions-light">
                {langSuggestions.map((lang) => (
                  <label key={lang}>
                    <input
                      type="checkbox"
                      checked={filterLang.includes(lang)}
                      onChange={() => {
                        toggleLang(lang);
                      }}
                    />
                    {lang}
                  </label>
                ))}
              </div>
            </div>

            <div className="suggestionBox-light">
              <input
                onChange={(e) => {
                  setTagText(e.target.value);
                }}
                className="searchInput-light"
                type="text"
              />
              {/* <div className="suggestions-light">
                {filterTags.map((tag, index) => (
                  <div key={tag}>
                    <p>{tag}</p>
                    <button
                      onClick={() => {
                        removeTag(index);
                      }}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div> */}

              <div className="suggestions-light">
                {tagSuggestions.map((tag) => (
                  <label key={tag.id}>
                    <input
                      type="checkbox"
                      checked={filterTags.includes(tag.label)}
                      onChange={() => {
                        toggleTag(tag.label);
                      }}
                    />
                    {tag.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <List
          snippets={viewList()}
          searchTerm={search}
          myCode={mycode}
          setEdit={setEdit}
        />
      </div>
      <Creator
        allTagList={allTagList}
        setAllTagList={setAllTagList}
        edit={edit}
        setEdit={setEdit}
      />
    </div>
  );
};
export default Home;
