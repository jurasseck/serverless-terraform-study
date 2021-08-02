resource "aws_iam_policy" "list_booking_policy" {
  name = "${var.environment}-list-booking-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:Scan",
        ]
        Effect   = "Allow"
        Resource = "${aws_dynamodb_table.bookings.arn}"
      },
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}
