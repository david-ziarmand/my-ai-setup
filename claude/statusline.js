let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let data = {};
  try {
    data = JSON.parse(raw.replace(/^﻿/, ""));
  } catch {}

  const paint = (code) => (text) => `\x1b[${code}m${text}\x1b[0m`;
  const white = paint(97);
  const yellow = paint(93);
  const red = paint(91);
  const byUsage = (used, yellowFrom, redFrom) => (used >= redFrom ? red : used >= yellowFrom ? yellow : white);

  const pad = (value) => String(value).padStart(2, "0");
  const formatTime = (date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  const formatDay = (date) => date.toLocaleDateString("en-US", { weekday: "short" });

  const formatLimit = (label, limit, withDay) => {
    if (!limit || limit.used_percentage == null) return `${label} ${white("n/a")}`;
    const color = byUsage(limit.used_percentage, 50, 75);
    const left = `${label} ${color(`${Math.floor(100 - limit.used_percentage)}%`)} left`;
    if (limit.resets_at == null) return left;
    const reset = new Date(Number(limit.resets_at) * 1000);
    const when = withDay ? `${formatDay(reset)} ${formatTime(reset)}` : formatTime(reset);
    return `${left}, Resets ${white(when)}`;
  };

  const parts = [];
  const model = data.model && data.model.display_name;
  const effort = data.effort && data.effort.level;
  if (model) parts.push(white(effort ? `${model} ${effort}` : model));

  const limits = data.rate_limits || {};
  parts.push(formatLimit("Session", limits.five_hour, false));
  parts.push(formatLimit("Weekly", limits.seven_day, true));

  const context = data.context_window || {};
  const input = context.total_input_tokens;
  const output = context.total_output_tokens;
  const size = context.context_window_size;
  if (input != null && output != null && size > 0) {
    const used = Math.round(Number(input) + Number(output));
    const color = byUsage((used / size) * 100, 50, 90);
    parts.push(`Context: ${color(`${used.toLocaleString("en-US")}/${Number(size).toLocaleString("en-US")}`)} tokens`);
  }

  process.stdout.write(parts.join(" | "));
});
