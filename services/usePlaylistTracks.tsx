import React from "react";
import { baseUrl } from "../config/baseUrl";
import useSWR from "swr";

type PlaylistRequestParams = {
  id: string | number;
  page: number;
  pageSize: number;
};

const fetchPlaylistTracks = async (props: PlaylistRequestParams) => {
  const res = await fetch(
    `${baseUrl}/playlist/track/all?timestamp=${Date.now()}`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        limit: props.pageSize,
        offset: (props.page - 1) * props.pageSize,
      }),
    }
  );
  return res.json();
};

function usePlaylistTracks(props: PlaylistRequestParams) {
  const response = useSWR(`${props.page}`, async () =>
    fetchPlaylistTracks(props)
  );
  return response;
}

export default usePlaylistTracks;
