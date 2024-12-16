"use client";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";

function StepCard({
  number,
  title,
  expanded,
  onNext,
  onPrev,
  completed,
}: {
  number: number;
  title: string;
  expanded: boolean;
  onNext: () => void;
  onPrev: () => void;
  completed: boolean;
}) {
  return (
    <Card
      sx={{
        opacity: expanded ? 1 : 0.5,
        backgroundColor: completed ? "#CCC" : "white",
      }}
    >
      <CardHeader
        title={
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <Chip label={`STEP${number}`} variant="filled" color="primary" />
            <Typography variant="subtitle1">{title}</Typography>
          </Stack>
        }
      />
      <Collapse in={expanded}>
        <CardContent>
          <Typography variant="body1">
            テキストテキストテキストテキストテキスト
          </Typography>
        </CardContent>
        <CardActions>
          {number !== 1 && (
            <Button onClick={onPrev} disabled={number === 1}>
              戻る
            </Button>
          )}
          <Button variant="contained" onClick={onNext}>
            {number === 4 ? "検索" : "次へ"}
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}

export default function StepDemo() {
  const steps = [
    { number: 1, title: "車メーカー" },
    { number: 2, title: "車種" },
    { number: 3, title: "グレード / 年式・型式" },
    { number: 4, title: "タイヤサイズ" },
  ];
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(steps.length).fill(false)
  );
  const [open, setOpen] = useState(false);

  const handleNext = (step: number) => {
    setCompletedSteps((prev) => {
      const newCompletedSteps = [...prev];
      newCompletedSteps[step - 1] = true;
      return newCompletedSteps;
    });
    setExpandedStep(step + 1);
  };

  const handlePrev = (step: number) => {
    setExpandedStep(step - 1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setExpandedStep(1);
    setCompletedSteps(new Array(steps.length).fill(false));
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        セット品を探す
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            fontWeight: 700,
            textAlign: "center",
            bgcolor: "primary.main",
            color: "white",
          }}
        >
          セット品を探す
        </DialogTitle>
        <DialogContent>
          <Stack gap={2} mt={2}>
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                expanded={expandedStep === step.number}
                onNext={() => handleNext(step.number)}
                onPrev={() => handlePrev(step.number)}
                completed={completedSteps[index]}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
