"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "#app/_components/card.tsx";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    Label,
    LabelList,
    Line,
    LineChart,
    PolarAngleAxis,
    RadialBar,
    RadialBarChart,
    Rectangle,
    ReferenceLine,
    XAxis,
    YAxis,
} from "#app/_components/chart.tsx";
import { useLocaleDateTimeFormatter } from "#app/_components/date-time.tsx";
import { makeBodyAndUnit } from "#app/_components/number.shared.tsx";
import {
    NumberFormatter,
    useLocaleNumberFormatter,
} from "#app/_components/number.tsx";
import { Separator } from "#app/_components/separator.tsx";

export interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    params: Promise<{ lang: string }>;
}

export default function Page(_props: PageProps) {
    const weekdayFormatter = useLocaleDateTimeFormatter({ variant: "weekday" });

    const dateFormatter = useLocaleDateTimeFormatter({ variant: "date" });

    const numberFormatter = useLocaleNumberFormatter();

    return (
        <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
            <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
                <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
                    <CardHeader className="space-y-0 pb-2">
                        <CardDescription>Today</CardDescription>
                        <CardTitle className="text-4xl tabular-nums">
                            <NumberFormatter number="12584" />
                            <span className="font-normal font-sans text-muted-foreground text-sm tracking-normal">
                                steps
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                steps: {
                                    label: "Steps",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                        >
                            <BarChart
                                accessibilityLayer
                                margin={{
                                    left: -4,
                                    right: -4,
                                }}
                                data={[
                                    {
                                        date: "2024-01-01",
                                        steps: 2000,
                                    },
                                    {
                                        date: "2024-01-02",
                                        steps: 2100,
                                    },
                                    {
                                        date: "2024-01-03",
                                        steps: 2200,
                                    },
                                    {
                                        date: "2024-01-04",
                                        steps: 1300,
                                    },
                                    {
                                        date: "2024-01-05",
                                        steps: 1400,
                                    },
                                    {
                                        date: "2024-01-06",
                                        steps: 2500,
                                    },
                                    {
                                        date: "2024-01-07",
                                        steps: 1600,
                                    },
                                ]}
                            >
                                <Bar
                                    dataKey="steps"
                                    fill="var(--color-steps)"
                                    radius={5}
                                    fillOpacity={0.6}
                                    activeBar={<Rectangle fillOpacity={0.8} />}
                                />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={4}
                                    tickFormatter={(value) =>
                                        weekdayFormatter.format(new Date(value))
                                    }
                                />
                                <ChartTooltip
                                    defaultIndex={2}
                                    content={
                                        <ChartTooltipContent
                                            hideIndicator
                                            labelFormatter={(value) =>
                                                dateFormatter.format(
                                                    new Date(value),
                                                )
                                            }
                                        />
                                    }
                                    cursor={false}
                                />
                                <ReferenceLine
                                    y={1200}
                                    stroke="hsl(var(--muted-foreground))"
                                    strokeDasharray="3 3"
                                    strokeWidth={1}
                                >
                                    <Label
                                        position="insideBottomLeft"
                                        value="Average Steps"
                                        offset={10}
                                        fill="hsl(var(--foreground))"
                                    />
                                    <Label
                                        position="insideTopLeft"
                                        value={numberFormatter.format("12343")}
                                        className="text-lg"
                                        fill="hsl(var(--foreground))"
                                        offset={10}
                                        startOffset={100}
                                    />
                                </ReferenceLine>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-1">
                        <CardDescription>
                            Over the past 7 days, you have walked{" "}
                            <NumberFormatter
                                className="font-medium text-foreground"
                                number="53305"
                            />{" "}
                            steps.
                        </CardDescription>
                        <CardDescription>
                            You need{" "}
                            <NumberFormatter
                                className="font-medium text-foreground"
                                number="12584"
                            />{" "}
                            more steps to reach your goal.
                        </CardDescription>
                    </CardFooter>
                </Card>
                <Card
                    className="flex flex-col lg:max-w-md"
                    x-chunk="charts-01-chunk-1"
                >
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
                        <div>
                            <CardDescription>Resting HR</CardDescription>
                            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                                <NumberFormatter number="62" />
                                <span className="font-normal text-muted-foreground text-sm tracking-normal">
                                    bpm
                                </span>
                            </CardTitle>
                        </div>
                        <div>
                            <CardDescription>Variability</CardDescription>
                            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                                <NumberFormatter
                                    number="35"
                                    variant="compact-millisecond"
                                    formatFromParts={(parts) => {
                                        const [body, unit] =
                                            makeBodyAndUnit(parts);
                                        return (
                                            <>
                                                {body}
                                                <span className="font-normal text-muted-foreground text-sm tracking-normal">
                                                    {unit}
                                                </span>
                                            </>
                                        );
                                    }}
                                />
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 items-center">
                        <ChartContainer
                            config={{
                                resting: {
                                    label: "Resting",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="w-full"
                        >
                            <LineChart
                                accessibilityLayer
                                margin={{
                                    left: 14,
                                    right: 14,
                                    top: 10,
                                }}
                                data={[
                                    {
                                        date: "2024-01-01",
                                        resting: 62,
                                    },
                                    {
                                        date: "2024-01-02",
                                        resting: 72,
                                    },
                                    {
                                        date: "2024-01-03",
                                        resting: 35,
                                    },
                                    {
                                        date: "2024-01-04",
                                        resting: 62,
                                    },
                                    {
                                        date: "2024-01-05",
                                        resting: 52,
                                    },
                                    {
                                        date: "2024-01-06",
                                        resting: 62,
                                    },
                                    {
                                        date: "2024-01-07",
                                        resting: 70,
                                    },
                                ]}
                            >
                                <CartesianGrid
                                    strokeDasharray="4 4"
                                    vertical={false}
                                    stroke="hsl(var(--muted-foreground))"
                                    strokeOpacity={0.5}
                                />
                                <YAxis
                                    hide
                                    domain={["dataMin - 10", "dataMax + 10"]}
                                />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <Line
                                    dataKey="resting"
                                    type="natural"
                                    fill="var(--color-resting)"
                                    stroke="var(--color-resting)"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{
                                        fill: "var(--color-resting)",
                                        stroke: "var(--color-resting)",
                                        r: 4,
                                    }}
                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent indicator="line" />
                                    }
                                    cursor={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
            <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
                <Card className="max-w-xs" x-chunk="charts-01-chunk-2">
                    <CardHeader>
                        <CardTitle>Progress</CardTitle>
                        <CardDescription>
                            You're average more steps a day this year than last
                            year.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid auto-rows-min gap-2">
                            <div className="flex items-baseline gap-1 font-bold text-2xl tabular-nums leading-none">
                                <NumberFormatter number="12453" />{" "}
                                <span className="font-normal text-muted-foreground text-sm">
                                    steps/day
                                </span>
                            </div>
                            <ChartContainer
                                config={{
                                    steps: {
                                        label: "Steps",
                                        color: "hsl(var(--chart-1))",
                                    },
                                }}
                                className="aspect-auto h-[32px] w-full"
                            >
                                <BarChart
                                    accessibilityLayer
                                    layout="vertical"
                                    margin={{
                                        left: 0,
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                    data={[
                                        {
                                            date: "2024",
                                            steps: 12435,
                                        },
                                    ]}
                                >
                                    <Bar
                                        dataKey="steps"
                                        fill="var(--color-steps)"
                                        radius={4}
                                        barSize={32}
                                    >
                                        <LabelList
                                            position="insideLeft"
                                            dataKey="date"
                                            offset={8}
                                            fontSize={12}
                                            fill="white"
                                        />
                                    </Bar>
                                    <YAxis
                                        dataKey="date"
                                        type="category"
                                        tickCount={1}
                                        hide
                                    />
                                    <XAxis dataKey="steps" type="number" hide />
                                </BarChart>
                            </ChartContainer>
                        </div>
                        <div className="grid auto-rows-min gap-2">
                            <div className="flex items-baseline gap-1 font-bold text-2xl tabular-nums leading-none">
                                <NumberFormatter number="10103" />{" "}
                                <span className="font-normal text-muted-foreground text-sm">
                                    steps/day
                                </span>
                            </div>
                            <ChartContainer
                                config={{
                                    steps: {
                                        label: "Steps",
                                        color: "hsl(var(--muted))",
                                    },
                                }}
                                className="aspect-auto h-[32px] w-full"
                            >
                                <BarChart
                                    accessibilityLayer
                                    layout="vertical"
                                    margin={{
                                        left: 0,
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                    data={[
                                        {
                                            date: "2023",
                                            steps: 10103,
                                        },
                                    ]}
                                >
                                    <Bar
                                        dataKey="steps"
                                        fill="var(--color-steps)"
                                        radius={4}
                                        barSize={32}
                                    >
                                        <LabelList
                                            position="insideLeft"
                                            dataKey="date"
                                            offset={8}
                                            fontSize={12}
                                            fill="hsl(var(--muted-foreground))"
                                        />
                                    </Bar>
                                    <YAxis
                                        dataKey="date"
                                        type="category"
                                        tickCount={1}
                                        hide
                                    />
                                    <XAxis dataKey="steps" type="number" hide />
                                </BarChart>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card className="max-w-xs" x-chunk="charts-01-chunk-3">
                    <CardHeader className="p-4 pb-0">
                        <CardTitle>Walking Distance</CardTitle>
                        <CardDescription>
                            Over the last 7 days, your distance walked and run
                            was 12.5 miles per day.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
                        <div className="flex items-baseline gap-1 font-bold text-3xl tabular-nums leading-none">
                            <NumberFormatter
                                number="12.5"
                                options={{
                                    style: "unit",
                                    unit: "mile-per-day",
                                    unitDisplay: "long",
                                }}
                                formatFromParts={(parts) => {
                                    const [body, unit] = makeBodyAndUnit(parts);

                                    return (
                                        <>
                                            {body}
                                            <span className="font-normal text-muted-foreground text-sm">
                                                {unit}
                                            </span>
                                        </>
                                    );
                                }}
                            />
                        </div>
                        <ChartContainer
                            config={{
                                steps: {
                                    label: "Steps",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="ml-auto w-[72px]"
                        >
                            <BarChart
                                accessibilityLayer
                                margin={{
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                }}
                                data={[
                                    {
                                        date: "2024-01-01",
                                        steps: 2000,
                                    },
                                    {
                                        date: "2024-01-02",
                                        steps: 2100,
                                    },
                                    {
                                        date: "2024-01-03",
                                        steps: 2200,
                                    },
                                    {
                                        date: "2024-01-04",
                                        steps: 1300,
                                    },
                                    {
                                        date: "2024-01-05",
                                        steps: 1400,
                                    },
                                    {
                                        date: "2024-01-06",
                                        steps: 2500,
                                    },
                                    {
                                        date: "2024-01-07",
                                        steps: 1600,
                                    },
                                ]}
                            >
                                <Bar
                                    dataKey="steps"
                                    fill="var(--color-steps)"
                                    radius={2}
                                    fillOpacity={0.2}
                                    activeIndex={6}
                                    activeBar={<Rectangle fillOpacity={0.8} />}
                                />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={4}
                                    hide
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="max-w-xs" x-chunk="charts-01-chunk-4">
                    <CardContent className="flex gap-4 p-4 pb-2">
                        <ChartContainer
                            config={{
                                move: {
                                    label: "Move",
                                    color: "hsl(var(--chart-1))",
                                },
                                stand: {
                                    label: "Stand",
                                    color: "hsl(var(--chart-2))",
                                },
                                exercise: {
                                    label: "Exercise",
                                    color: "hsl(var(--chart-3))",
                                },
                            }}
                            className="h-[140px] w-full"
                        >
                            <BarChart
                                margin={{
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 10,
                                }}
                                data={[
                                    {
                                        activity: "stand",
                                        value: (8 / 12) * 100,
                                        label: "8/12 hr",
                                        fill: "var(--color-stand)",
                                    },
                                    {
                                        activity: "exercise",
                                        value: (46 / 60) * 100,
                                        label: "46/60 min",
                                        fill: "var(--color-exercise)",
                                    },
                                    {
                                        activity: "move",
                                        value: (245 / 360) * 100,
                                        label: "245/360 kcal",
                                        fill: "var(--color-move)",
                                    },
                                ]}
                                layout="vertical"
                                barSize={32}
                                barGap={2}
                            >
                                <XAxis type="number" dataKey="value" hide />
                                <YAxis
                                    dataKey="activity"
                                    type="category"
                                    tickLine={false}
                                    tickMargin={4}
                                    axisLine={false}
                                    className="capitalize"
                                />
                                <Bar dataKey="value" radius={5}>
                                    <LabelList
                                        position="insideLeft"
                                        dataKey="label"
                                        fill="white"
                                        offset={8}
                                        fontSize={12}
                                    />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex flex-row border-t p-4">
                        <div className="flex w-full items-center gap-2">
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-muted-foreground text-xs">
                                    Move
                                </div>
                                <div className="flex items-baseline gap-1 font-bold text-2xl tabular-nums leading-none">
                                    <NumberFormatter number="562" />{" "}
                                    <span className="font-normal text-muted-foreground text-sm">
                                        kcal
                                    </span>
                                </div>
                            </div>
                            <Separator
                                orientation="vertical"
                                className="mx-2 h-10 w-px"
                            />
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-muted-foreground text-xs">
                                    Exercise
                                </div>
                                <div className="flex items-baseline gap-1 font-bold text-2xl tabular-nums leading-none">
                                    <NumberFormatter
                                        number="73"
                                        variant="compact-hour"
                                        formatFromParts={(parts) => {
                                            const [body, unit] =
                                                makeBodyAndUnit(parts);

                                            return (
                                                <>
                                                    {body}
                                                    <span className="font-normal text-muted-foreground text-sm">
                                                        {unit}
                                                    </span>
                                                </>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            <Separator
                                orientation="vertical"
                                className="mx-2 h-10 w-px"
                            />
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-muted-foreground text-xs">
                                    Stand
                                </div>
                                <div className="flex items-baseline gap-1 font-bold text-2xl tabular-nums leading-none">
                                    <NumberFormatter
                                        number="14"
                                        variant="compact-hour"
                                        formatFromParts={(parts) => {
                                            const [body, unit] =
                                                makeBodyAndUnit(parts);

                                            return (
                                                <>
                                                    {body}
                                                    <span className="font-normal text-muted-foreground text-sm">
                                                        {unit}
                                                    </span>
                                                </>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <div className="grid w-full flex-1 gap-6">
                <Card className="max-w-xs" x-chunk="charts-01-chunk-5">
                    <CardContent className="flex gap-4 p-4">
                        <div className="grid items-center gap-2">
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-muted-foreground text-sm">
                                    Move
                                </div>
                                <div className="flex items-baseline gap-1 font-bold text-xl tabular-nums leading-none">
                                    <NumberFormatter number="562" />/
                                    <NumberFormatter number="600" />
                                    <span className="font-normal text-muted-foreground text-sm">
                                        kcal
                                    </span>
                                </div>
                            </div>
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-muted-foreground text-sm">
                                    Exercise
                                </div>
                                <div className="flex items-baseline gap-1 font-bold text-xl tabular-nums leading-none">
                                    <NumberFormatter number="73" />/
                                    <NumberFormatter
                                        number="1000000"
                                        formatFromParts={(parts) => {
                                            const [body, unit] =
                                                makeBodyAndUnit(parts);

                                            return (
                                                <>
                                                    {body}
                                                    <span className="font-normal text-muted-foreground text-sm">
                                                        {unit}
                                                    </span>
                                                </>
                                            );
                                        }}
                                        variant="compact-minute"
                                    />
                                </div>
                            </div>
                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                <div className="text-muted-foreground text-sm">
                                    Stand
                                </div>
                                <div className="flex items-baseline gap-1 font-bold text-xl tabular-nums leading-none">
                                    <NumberFormatter number="8" />/
                                    <NumberFormatter
                                        number="12"
                                        variant="compact-hour"
                                        formatFromParts={(parts) => {
                                            const [body, unit] =
                                                makeBodyAndUnit(parts);

                                            return (
                                                <>
                                                    {body}
                                                    <span className="font-normal text-muted-foreground text-sm">
                                                        {unit}
                                                    </span>
                                                </>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <ChartContainer
                            config={{
                                move: {
                                    label: "Move",
                                    color: "hsl(var(--chart-1))",
                                },
                                exercise: {
                                    label: "Exercise",
                                    color: "hsl(var(--chart-2))",
                                },
                                stand: {
                                    label: "Stand",
                                    color: "hsl(var(--chart-3))",
                                },
                            }}
                            className="mx-auto aspect-square w-full max-w-[80%]"
                        >
                            <RadialBarChart
                                margin={{
                                    left: -10,
                                    right: -10,
                                    top: -10,
                                    bottom: -10,
                                }}
                                data={[
                                    {
                                        activity: "stand",
                                        value: (8 / 12) * 100,
                                        fill: "var(--color-stand)",
                                    },
                                    {
                                        activity: "exercise",
                                        value: (46 / 60) * 100,
                                        fill: "var(--color-exercise)",
                                    },
                                    {
                                        activity: "move",
                                        value: (245 / 360) * 100,
                                        fill: "var(--color-move)",
                                    },
                                ]}
                                innerRadius="20%"
                                barSize={24}
                                startAngle={90}
                                endAngle={450}
                            >
                                <PolarAngleAxis
                                    type="number"
                                    domain={[0, 100]}
                                    dataKey="value"
                                    tick={false}
                                />
                                <RadialBar
                                    dataKey="value"
                                    background
                                    cornerRadius={5}
                                />
                            </RadialBarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="max-w-xs" x-chunk="charts-01-chunk-6">
                    <CardHeader className="p-4 pb-0">
                        <CardTitle>Active Energy</CardTitle>
                        <CardDescription>
                            You're burning an average of{" "}
                            <NumberFormatter number="754" /> calories per day.
                            Good job!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
                        <div className="flex items-baseline gap-2 font-bold text-3xl tabular-nums leading-none">
                            <NumberFormatter number="1254" />
                            <span className="font-normal text-muted-foreground text-sm">
                                kcal/day
                            </span>
                        </div>
                        <ChartContainer
                            config={{
                                calories: {
                                    label: "Calories",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="ml-auto w-[64px]"
                        >
                            <BarChart
                                accessibilityLayer
                                margin={{
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                }}
                                data={[
                                    {
                                        date: "2024-01-01",
                                        calories: 354,
                                    },
                                    {
                                        date: "2024-01-02",
                                        calories: 514,
                                    },
                                    {
                                        date: "2024-01-03",
                                        calories: 345,
                                    },
                                    {
                                        date: "2024-01-04",
                                        calories: 734,
                                    },
                                    {
                                        date: "2024-01-05",
                                        calories: 645,
                                    },
                                    {
                                        date: "2024-01-06",
                                        calories: 456,
                                    },
                                    {
                                        date: "2024-01-07",
                                        calories: 345,
                                    },
                                ]}
                            >
                                <Bar
                                    dataKey="calories"
                                    fill="var(--color-calories)"
                                    radius={2}
                                    fillOpacity={0.2}
                                    activeIndex={6}
                                    activeBar={<Rectangle fillOpacity={0.8} />}
                                />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={4}
                                    hide
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="max-w-xs" x-chunk="charts-01-chunk-7">
                    <CardHeader className="space-y-0 pb-0">
                        <CardDescription>Time in Bed</CardDescription>
                        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                            8
                            <span className="font-normal font-sans text-muted-foreground text-sm tracking-normal">
                                hr
                            </span>
                            35
                            <span className="font-normal font-sans text-muted-foreground text-sm tracking-normal">
                                min
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ChartContainer
                            config={{
                                time: {
                                    label: "Time",
                                    color: "hsl(var(--chart-2))",
                                },
                            }}
                        >
                            <AreaChart
                                accessibilityLayer
                                data={[
                                    {
                                        date: "2024-01-01",
                                        time: 8.5,
                                    },
                                    {
                                        date: "2024-01-02",
                                        time: 7.2,
                                    },
                                    {
                                        date: "2024-01-03",
                                        time: 8.1,
                                    },
                                    {
                                        date: "2024-01-04",
                                        time: 6.2,
                                    },
                                    {
                                        date: "2024-01-05",
                                        time: 5.2,
                                    },
                                    {
                                        date: "2024-01-06",
                                        time: 8.1,
                                    },
                                    {
                                        date: "2024-01-07",
                                        time: 7.0,
                                    },
                                ]}
                                margin={{
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                }}
                            >
                                <XAxis dataKey="date" hide />
                                <YAxis
                                    domain={["dataMin - 5", "dataMax + 2"]}
                                    hide
                                />
                                <defs>
                                    <linearGradient
                                        id="fillTime"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-time)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-time)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <Area
                                    dataKey="time"
                                    type="natural"
                                    fill="url(#fillTime)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-time)"
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                    formatter={(value: number) => (
                                        <div className="flex min-w-[120px] items-center text-muted-foreground text-xs">
                                            Time in bed
                                            <NumberFormatter
                                                className="ml-auto flex items-baseline gap-0.5 font-medium font-mono text-foreground tabular-nums"
                                                number={value}
                                                variant="compact-hour"
                                                formatFromParts={(parts) => {
                                                    const [body, unit] =
                                                        makeBodyAndUnit(parts);

                                                    return (
                                                        <>
                                                            {body}
                                                            <span className="font-normal text-muted-foreground">
                                                                {unit}
                                                            </span>
                                                        </>
                                                    );
                                                }}
                                            />
                                        </div>
                                    )}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
