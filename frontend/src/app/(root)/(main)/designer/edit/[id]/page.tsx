"use client";

import DesignerEditor from "@/components/layout/DesignerEditor";
import { useToast } from "@/components/ui/ToastProvider";
import useFetchState from "@/hooks/useFetchState";
import apiClient from "@/lib/apiClient";
import { Design, DesignType } from "@/types/data";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { data, setData, error, setError } = useFetchState<DesignType>();
  const toast = useToast();

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setError("Invalid designer id");
      return;
    }

    const fetchDesigner = async () => {
      const { data, error } = await apiClient<Design>(`designs/${id}`);
      if (error) {
        setError("Error fetching designer data for update");
        return;
      }

      if (data) {
        const designerData: DesignType = {
          name: data.name,
          total_color_palettes: data.total_color_palettes,
          color_box_1: data.color_box_1,
          color_box_2: data.color_box_2,
          color_box_3: data.color_box_3,
          color_box_4: data.color_box_4,
          starting_position: data.starting_position,
          machine_type: data.machine_type,
          design_grids: data.design_grids,
        };

        setData(designerData);
      }
    };

    fetchDesigner();
  }, [id, setData, setError]);

  const updateHandler = async (designerData: DesignType) => {
    const { error } = await apiClient<Design>(`designs/${id}`, {
      method: "PUT",
      body: designerData,
    });

    if (error) {
      toast("Error updating designer data", "error");
      return;
    }
    toast("Designer data updated successfully", "success");
  };

  return (
    <div>
      {error ? (
        <p className="font-semibold text-base text-center capitalize tracking-wide">
          {error}
        </p>
      ) : (
        data && (
          <DesignerEditor
            designerState={data}
            handler={updateHandler}
            title="Update"
          />
        )
      )}
    </div>
  );
};

export default Page;
