"use client";

import React, { useState } from "react";
import { Rnd } from "react-rnd";
import NextImage from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import HandleComponent from "@/components/HandleComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, Radio } from "@headlessui/react";
import { COLORS, MODELS } from "@/validators/option-validator";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}

const DesignConfigurator = ({ configId, imageUrl, imageDimensions }: DesignConfiguratorProps) => {
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
  });

  return (
    <div className="relative mt-20 grid grid-cols-3 mb-20 pb-20">
      <div
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2
        border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ratio={896 / 1831}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
          >
            <NextImage
              fill
              src="/phone-template.png"
              alt="Phone Image"
              className="pointer-events-none select-none z-50"
            />
          </AspectRatio>
          <div
            className="absolute z-40 left-[3px] inset-0 top-px right-[3px] bottom-px rounded-[32px]
            shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]"
          />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              {
                "bg-zinc-900": options.color.value === "black",
                "bg-blue-950": options.color.value === "blue",
                "bg-rose-950": options.color.value === "rose",
              }
            )}
          />
        </div>
        <Rnd
          default={{
            x: 150,
            y: 205,
            width: imageDimensions.width / 4,
            height: imageDimensions.height / 4,
          }}
          className="absolute z-20 border-[3px] border-primary"
          lockAspectRatio
          resizeHandleComponent={{
            bottomLeft: <HandleComponent />,
            bottomRight: <HandleComponent />,
            topLeft: <HandleComponent />,
            topRight: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full">
            <NextImage src={imageUrl} fill alt="Your Image" className="pointer-events-none" />
          </div>
        </Rnd>
      </div>

      <div className="h-[37.5rem] flex flex-col bg-white">
        <ScrollArea className="relative flex flex-1 overflow-auto">
          <div className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"></div>
          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">Customize your case</h2>
            <div className="w-full h-px bg-zinc-200 my-6"></div>
            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: val,
                    }));
                  }}
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <Radio
                        key={color.label}
                        value={color}
                        className={({ checked }) =>
                          cn(
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                            {
                              [`border-${color.tw}`]: checked,
                            }
                          )
                        }
                      >
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            "size-8 rounded-full border border-black border-opacity-10"
                          )}
                        ></span>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
                <div className="relative flex flex-col gap-3 w-full">
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" role="combobox" className="w-full justify-between">
                        {options.model.label}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                            {
                              "bg-zinc-100": model.label === options.model.label,
                            }
                          )}
                          onClick={() => {
                            setOptions((prev) => ({
                              ...prev,
                              model,
                            }));
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 size-4",
                              model.label === options.model.label ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DesignConfigurator;
