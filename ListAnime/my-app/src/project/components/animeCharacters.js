import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AnimeCharacters({ animeLocal }) {
  const [animeCharacters, setAnimeCharacters] = useState();

  const getAnimeCharacters = async (id) => {
    const result = await axios.get(
      `https://api.jikan.moe/v4/anime/${id}/characters`
    );

    setAnimeCharacters(result.data);
  };
  useEffect(() => {
    getAnimeCharacters(animeLocal.data.mal_id);
  }, [animeLocal]);
  return (
    <div style={{ marginLeft: "5px", marginRight: "5px", color: "white" }}>
      <div className="inline" style={{ textAlign: "start" }}>
        <h4>Characters & voice Actors</h4>
      </div>
      {animeCharacters &&
        Object.keys(animeCharacters["data"]).map((item, index) => {
          return (
            <table
              border={0}
              cellPadding={0}
              cellSpacing={0}
              width={"100%"}
              key={item}
            >
              <tbody>
                <tr>
                  <td valign="top" width={27} className="borderClass">
                    <div className="picSurround">
                      <a>
                        <img
                          src={
                            animeCharacters["data"][item].character.images.jpg
                              .image_url
                          }
                          style={{ width: "54px", height: "83px" }}
                        ></img>
                      </a>
                    </div>
                  </td>
                  <td valign="top" className="borderClass">
                    <div className="spaceit_pad">
                      <h3 className="character-name">
                        {animeCharacters["data"][item].character.name}
                      </h3>
                    </div>
                    <div className="spaceit_pad">
                      {animeCharacters["data"][item].role}
                    </div>
                    <div className="spaceit_pad">
                      {animeCharacters["data"][item].favorites} Favorities
                    </div>
                  </td>
                  <td align="right" valign="top" className="borderClass">
                    {animeCharacters["data"][item].voice_actors.map(
                      (item, index) => {
                        return (
                          <table
                            border={0}
                            cellPadding={0}
                            cellSpacing={0}
                            key={index}
                          >
                            <tbody>
                              <tr>
                                <td
                                  valign="top"
                                  align="right"
                                  style={{
                                    padding: "0 4px",
                                  }}
                                >
                                  <div
                                    className="spaceit_pad"
                                    style={{ textAlign: "end" }}
                                  >
                                    {item.person.name}
                                  </div>
                                  <div
                                    className="spaceit_pad"
                                    style={{ textAlign: "end" }}
                                  >
                                    {item.language}
                                  </div>
                                </td>
                                <td valign="top">
                                  <div className="picSurround">
                                    <a>
                                      <img
                                        src={item.person.images.jpg.image_url}
                                        style={{
                                          width: "54px",
                                          height: "83px",
                                        }}
                                      ></img>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        );
                      }
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
    </div>
  );
}
