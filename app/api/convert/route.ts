import { NextResponse } from "next/server";

const lengthFactors: Record<string, number> = {
  millimeter: 0.001,
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
};

const weightFactors: Record<string, number> = {
  milligram: 1e-6,
  gram: 1e-3,
  kilogram: 1,
  ounce: 0.0283495231,
  pound: 0.45359237,
};

function convertLength(value: number, from: string, to: string): number {
  const fromFactor = lengthFactors[from];
  const toFactor = lengthFactors[to];
  if (fromFactor == null || toFactor == null) {
    throw new Error("Unsupported length unit");
  }
  const inMeters = value * fromFactor;
  return inMeters / toFactor;
}

function convertWeight(value: number, from: string, to: string): number {
  const fromFactor = weightFactors[from];
  const toFactor = weightFactors[to];
  if (fromFactor == null || toFactor == null) {
    throw new Error("Unsupported weight unit");
  }
  const inKg = value * fromFactor;
  return inKg / toFactor;
}

function convertTemperature(value: number, from: string, to: string): number {
  let celsius: number;

  switch (from) {
    case "celsius":
      celsius = value;
      break;
    case "fahrenheit":
      celsius = ((value - 32) * 5) / 9;
      break;
    case "kelvin":
      celsius = value - 273.15;
      break;
    default:
      throw new Error("Unsupported temperature unit");
  }

  switch (to) {
    case "celsius":
      return celsius;
    case "fahrenheit":
      return (celsius * 9) / 5 + 32;
    case "kelvin":
      return celsius + 273.15;
    default:
      throw new Error("Unsupported temperature unit");
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, value, from, to } = body as {
      type: "length" | "weight" | "temperature";
      value: number;
      from: string;
      to: string;
    };

    if (value == null || Number.isNaN(Number(value))) {
      return NextResponse.json({ error: "Invalid value" }, { status: 400 });
    }

    const numericValue = Number(value);

    let result: number;

    switch (type) {
      case "length":
        result = convertLength(numericValue, from, to);
        break;
      case "weight":
        result = convertWeight(numericValue, from, to);
        break;
      case "temperature":
        result = convertTemperature(numericValue, from, to);
        break;
      default:
        return NextResponse.json(
          { error: "Unsupported conversion type" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      type,
      from,
      to,
      value: numericValue,
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Conversion failed" },
      { status: 400 }
    );
  }
}
